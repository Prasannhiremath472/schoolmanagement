export declare class CreateSchoolDto {
    name: string;
    slug: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    timezone?: string;
    adminEmail: string;
    adminPassword?: string;
}
declare const UpdateSchoolDto_base: import("@nestjs/common").Type<Partial<CreateSchoolDto>>;
export declare class UpdateSchoolDto extends UpdateSchoolDto_base {
}
export {};
