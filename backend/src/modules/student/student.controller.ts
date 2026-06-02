import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@ApiTags('Students')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'students', version: '1' })
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @Roles('SCHOOL_ADMIN', 'TEACHER', 'ACCOUNTANT')
  @ApiOperation({ summary: 'Get all students with pagination' })
  @ApiQuery({ name: 'sectionId', required: false })
  @ApiQuery({ name: 'classId', required: false })
  @ApiQuery({ name: 'status', required: false })
  findAll(
    @Query() pagination: PaginationDto,
    @Query('sectionId') sectionId?: string,
    @Query('classId') classId?: string,
    @Query('status') status?: string,
  ) {
    return this.studentService.findAll({ ...pagination, sectionId, classId, status });
  }

  @Get('stats')
  @Roles('SCHOOL_ADMIN')
  @ApiOperation({ summary: 'Get student statistics' })
  getStats() {
    return this.studentService.getStats();
  }

  @Get(':id')
  @Roles('SCHOOL_ADMIN', 'TEACHER', 'PARENT')
  @ApiOperation({ summary: 'Get student by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentService.findOne(id);
  }

  @Post()
  @Roles('SCHOOL_ADMIN')
  @ApiOperation({ summary: 'Admit new student' })
  create(@Body() dto: CreateStudentDto) {
    return this.studentService.create(dto);
  }

  @Post('bulk-import')
  @Roles('SCHOOL_ADMIN')
  @ApiOperation({ summary: 'Bulk import students' })
  bulkImport(@Body() students: CreateStudentDto[]) {
    return this.studentService.bulkImport(students);
  }

  @Post('promote')
  @Roles('SCHOOL_ADMIN')
  @ApiOperation({ summary: 'Promote students to next section' })
  promote(@Body() dto: { sectionId: string; newSectionId: string; studentIds: string[] }) {
    return this.studentService.promoteStudents(dto.sectionId, dto.newSectionId, dto.studentIds);
  }

  @Put(':id')
  @Roles('SCHOOL_ADMIN')
  @ApiOperation({ summary: 'Update student details' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateStudentDto) {
    return this.studentService.update(id, dto);
  }

  @Delete(':id')
  @Roles('SCHOOL_ADMIN')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deactivate student' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentService.delete(id);
  }

  @Get(':id/attendance')
  @ApiOperation({ summary: 'Get student attendance summary' })
  @ApiQuery({ name: 'month', required: true })
  @ApiQuery({ name: 'year', required: true })
  getAttendance(@Param('id', ParseUUIDPipe) id: string, @Query('month') month: number, @Query('year') year: number) {
    return this.studentService.getAttendanceSummary(id, +month, +year);
  }

  // ─── Transfer ─────────────────────────────────────────────────────────────
  @Patch(':id/transfer') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Transfer student to another school' })
  transfer(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any) { return this.studentService.transferStudent(id, dto); }

  // ─── Alumni ───────────────────────────────────────────────────────────────
  @Get('alumni/list') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Get alumni list' })
  getAlumni(@Query() query: PaginationDto) { return this.studentService.getAlumni(query); }

  @Patch(':id/alumni') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Mark student as alumni' })
  promoteAlumni(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any) { return this.studentService.promoteToAlumni(id, dto); }

  // ─── Medical Records ──────────────────────────────────────────────────────
  @Get(':id/medical') @Roles('SCHOOL_ADMIN', 'TEACHER') @ApiOperation({ summary: 'Get student medical info' })
  getMedical(@Param('id', ParseUUIDPipe) id: string) { return this.studentService.getMedicalInfo(id); }

  @Patch(':id/medical') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Update student medical info' })
  updateMedical(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any) { return this.studentService.updateMedicalInfo(id, dto); }

  // ─── Documents ────────────────────────────────────────────────────────────
  @Get(':id/documents') @Roles('SCHOOL_ADMIN', 'TEACHER', 'PARENT') @ApiOperation({ summary: 'Get student documents' })
  getDocuments(@Param('id', ParseUUIDPipe) id: string) { return this.studentService.getDocuments(id); }

  @Post(':id/documents') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Upload student document' })
  addDocument(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any) { return this.studentService.addDocument(id, dto); }

  @Delete(':id/documents/:docId') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Remove student document' })
  removeDocument(@Param('docId', ParseUUIDPipe) docId: string) { return this.studentService.removeDocument(docId); }
}
