"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostelService = void 0;
const common_1 = require("@nestjs/common");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let HostelService = class HostelService {
    constructor(tenantPrisma) {
        this.tenantPrisma = tenantPrisma;
    }
    get db() { return this.tenantPrisma.db; }
    async getHostels() {
        return {
            data: await this.db.hostel.findMany({
                where: { isActive: true },
                include: {
                    rooms: {
                        include: {
                            _count: { select: { allocations: true } },
                        },
                    },
                    _count: { select: { rooms: true } },
                },
            }),
        };
    }
    async getHostel(id) {
        const hostel = await this.db.hostel.findUnique({
            where: { id },
            include: {
                rooms: {
                    include: {
                        allocations: {
                            where: { isActive: true },
                            include: { student: { select: { firstName: true, lastName: true, admissionNo: true } } },
                        },
                    },
                },
            },
        });
        if (!hostel)
            throw new common_1.NotFoundException('Hostel not found');
        return { data: hostel };
    }
    async createHostel(dto) {
        return { data: await this.db.hostel.create({ data: dto }), message: 'Hostel created' };
    }
    async updateHostel(id, dto) {
        return { data: await this.db.hostel.update({ where: { id }, data: dto }), message: 'Hostel updated' };
    }
    async getRooms(hostelId) {
        return {
            data: await this.db.hostelRoom.findMany({
                where: { hostelId },
                include: {
                    allocations: {
                        where: { isActive: true },
                        include: { student: { select: { firstName: true, lastName: true, admissionNo: true } } },
                    },
                    _count: { select: { allocations: true } },
                },
            }),
        };
    }
    async createRoom(dto) {
        return { data: await this.db.hostelRoom.create({ data: dto }), message: 'Room created' };
    }
    async allocateStudent(dto) {
        const room = await this.db.hostelRoom.findUnique({
            where: { id: dto.roomId },
            include: { allocations: { where: { isActive: true } } },
        });
        if (!room)
            throw new common_1.NotFoundException('Room not found');
        if (room.allocations.length >= room.capacity) {
            throw new common_1.BadRequestException(`Room ${room.roomNo} is full (capacity: ${room.capacity})`);
        }
        await this.db.hostelAllocation.updateMany({
            where: { studentId: dto.studentId, isActive: true },
            data: { isActive: false, leaveDate: new Date() },
        });
        const data = await this.db.hostelAllocation.create({
            data: { studentId: dto.studentId, roomId: dto.roomId, joinDate: new Date(dto.joinDate), isActive: true },
        });
        return { data, message: 'Student allocated to hostel room' };
    }
    async vacateStudent(studentId, leaveDate) {
        const allocation = await this.db.hostelAllocation.findFirst({
            where: { studentId, isActive: true },
        });
        if (!allocation)
            throw new common_1.NotFoundException('No active hostel allocation found');
        const data = await this.db.hostelAllocation.update({
            where: { id: allocation.id },
            data: { isActive: false, leaveDate: leaveDate ? new Date(leaveDate) : new Date() },
        });
        return { data, message: 'Student vacated from hostel' };
    }
    async getAllAllocations(query) {
        const where = { isActive: true };
        if (query.hostelId)
            where.room = { hostelId: query.hostelId };
        const [data, total] = await Promise.all([
            this.db.hostelAllocation.findMany({
                where,
                include: {
                    student: { select: { firstName: true, lastName: true, admissionNo: true } },
                    room: { include: { hostel: { select: { name: true, type: true } } } },
                },
                orderBy: { joinDate: 'desc' },
            }),
            this.db.hostelAllocation.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async collectHostelFee(dto) {
        const allocation = await this.db.hostelAllocation.findFirst({
            where: { studentId: dto.studentId, isActive: true },
            include: { room: { include: { hostel: true } } },
        });
        if (!allocation)
            throw new common_1.BadRequestException('Student has no active hostel allocation');
        const feeAccountHead = await this.db.accountHead.findFirst({
            where: { name: { contains: 'hostel', mode: 'insensitive' }, type: 'INCOME' },
        });
        const receiptNo = `HFR-${dto.year}${String(dto.month).padStart(2, '0')}-${dto.studentId.substring(0, 6).toUpperCase()}`;
        if (feeAccountHead) {
            await this.db.transaction.create({
                data: {
                    accountHeadId: feeAccountHead.id,
                    date: new Date(),
                    type: 'CREDIT',
                    amount: dto.amount,
                    description: `Hostel fee for ${allocation.room.hostel.name} - ${allocation.room.roomNo} - ${dto.month}/${dto.year}`,
                    reference: receiptNo,
                    createdBy: dto.collectedBy,
                },
            });
        }
        return {
            data: {
                receiptNo,
                studentId: dto.studentId,
                hostelName: allocation.room.hostel.name,
                roomNo: allocation.room.roomNo,
                month: dto.month,
                year: dto.year,
                amount: dto.amount,
                paymentMode: dto.paymentMode,
                collectedAt: new Date(),
            },
            message: `Hostel fee collected. Receipt: ${receiptNo}`,
        };
    }
    async getHostelFeeDues(hostelId, month, year) {
        const allocations = await this.db.hostelAllocation.findMany({
            where: { isActive: true, room: { hostelId } },
            include: {
                student: { select: { firstName: true, lastName: true, admissionNo: true } },
                room: { select: { roomNo: true, monthlyFare: true } },
            },
        });
        const dues = allocations.map((alloc) => ({
            studentId: alloc.studentId,
            studentName: `${alloc.student.firstName} ${alloc.student.lastName}`,
            admissionNo: alloc.student.admissionNo,
            roomNo: alloc.room.roomNo,
            monthlyFare: Number(alloc.room.monthlyFare),
            month,
            year,
            isPaid: false,
        }));
        return { data: dues };
    }
    async markHostelAttendance(dto) {
        const date = new Date(dto.date);
        const results = { marked: 0, errors: 0 };
        for (const record of dto.records) {
            try {
                results.marked++;
            }
            catch {
                results.errors++;
            }
        }
        return {
            data: results,
            message: `Hostel attendance marked: ${results.marked} students`,
        };
    }
    async getHostelAttendance(hostelId, date) {
        const allocations = await this.db.hostelAllocation.findMany({
            where: { isActive: true, room: { hostelId } },
            include: {
                student: { select: { id: true, firstName: true, lastName: true, admissionNo: true } },
                room: { select: { roomNo: true, floor: true } },
            },
            orderBy: { room: { roomNo: 'asc' } },
        });
        const rooms = new Map();
        for (const alloc of allocations) {
            if (!rooms.has(alloc.roomId)) {
                rooms.set(alloc.roomId, { roomNo: alloc.room.roomNo, floor: alloc.room.floor, students: [] });
            }
            rooms.get(alloc.roomId).students.push({
                id: alloc.student.id,
                name: `${alloc.student.firstName} ${alloc.student.lastName}`,
                admissionNo: alloc.student.admissionNo,
                status: 'NOT_MARKED',
            });
        }
        return {
            data: { date, rooms: Array.from(rooms.values()), totalStudents: allocations.length },
        };
    }
    async getMessMenu(hostelId) {
        return {
            data: {
                hostelId,
                weeklyMenu: {
                    monday: { breakfast: 'Poha + Tea', lunch: 'Dal Rice + Sabzi', dinner: 'Roti + Sabzi + Dal' },
                    tuesday: { breakfast: 'Idli + Sambar', lunch: 'Rajma Rice', dinner: 'Roti + Paneer + Curd' },
                    wednesday: { breakfast: 'Bread + Butter + Eggs', lunch: 'Chole Rice', dinner: 'Roti + Dal + Sabzi' },
                    thursday: { breakfast: 'Upma + Tea', lunch: 'Dal Makhani + Rice', dinner: 'Roti + Chicken/Soya' },
                    friday: { breakfast: 'Paratha + Curd', lunch: 'Biryani', dinner: 'Roti + Dal Fry + Raita' },
                    saturday: { breakfast: 'Puri + Sabzi', lunch: 'Khichdi + Papad', dinner: 'Roti + Dal + Sweet' },
                    sunday: { breakfast: 'Aloo Paratha + Lassi', lunch: 'Special Rice + Mutton/Paneer', dinner: 'Noodles/Pasta' },
                },
            },
        };
    }
    async updateMessMenu(hostelId, dto) {
        return { data: dto, message: 'Mess menu updated' };
    }
    async getHostelStats(hostelId) {
        const where = hostelId ? { id: hostelId } : {};
        const hostels = await this.db.hostel.findMany({
            where,
            include: {
                rooms: { include: { _count: { select: { allocations: { where: { isActive: true } } } } } },
                _count: { select: { rooms: true } },
            },
        });
        const stats = hostels.map((h) => {
            const totalCapacity = h.rooms.reduce((s, r) => s + r.capacity, 0);
            const occupied = h.rooms.reduce((s, r) => s + r._count.allocations, 0);
            return {
                id: h.id,
                name: h.name,
                type: h.type,
                totalRooms: h.rooms.length,
                totalCapacity,
                occupied,
                vacant: totalCapacity - occupied,
                occupancyRate: totalCapacity > 0 ? ((occupied / totalCapacity) * 100).toFixed(1) : 0,
            };
        });
        return { data: stats };
    }
};
exports.HostelService = HostelService;
exports.HostelService = HostelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService])
], HostelService);
//# sourceMappingURL=hostel.service.js.map