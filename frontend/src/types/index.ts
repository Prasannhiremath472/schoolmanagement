export interface PaginationDto {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: PaginationMeta;
  timestamp: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface User {
  id: string;
  email?: string;
  phone?: string;
  role: string;
  isActive: boolean;
  profilePhoto?: string;
}

export interface Student {
  id: string;
  admissionNo: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  status: 'ACTIVE' | 'INACTIVE' | 'TRANSFERRED' | 'ALUMNI';
  bloodGroup?: string;
  photo?: string;
}

export interface Teacher {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  designation?: string;
  department?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface School {
  id: string;
  name: string;
  slug: string;
  email: string;
  status: 'TRIAL' | 'ACTIVE' | 'SUSPENDED' | 'EXPIRED';
  primaryColor: string;
  secondaryColor: string;
  logo?: string;
}
