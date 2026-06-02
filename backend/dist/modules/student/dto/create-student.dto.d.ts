export declare enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}
export declare enum Category {
    GENERAL = "GENERAL",
    OBC = "OBC",
    SC = "SC",
    ST = "ST",
    EWS = "EWS",
    OTHER = "OTHER"
}
export declare class CreateStudentDto {
    admissionNo: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: string;
    gender: Gender;
    bloodGroup?: string;
    religion?: string;
    caste?: string;
    category?: Category;
    email?: string;
    phone?: string;
    password?: string;
    aadhaarNo?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    admissionDate: string;
    previousSchool?: string;
    sectionId?: string;
    rollNo?: string;
}
