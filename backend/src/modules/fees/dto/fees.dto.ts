import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString, IsNumber, IsOptional, IsUUID, IsEnum, IsArray,
  ValidateNested, IsBoolean, IsDateString, Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFeeCategoryDto {
  @ApiProperty() @IsString() name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}

export class FeeItemDto {
  @ApiProperty() @IsUUID() feeCategoryId: string;
  @ApiProperty() @IsNumber() @Min(0) amount: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isMandatory?: boolean;
}

export class InstallmentDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsDateString() dueDate: string;
  @ApiProperty() @IsNumber() @Min(0) amount: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() lateFinePerDay?: number;
}

export class CreateFeeStructureDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsUUID() classId: string;
  @ApiProperty() @IsUUID() academicYearId: string;
  @ApiProperty({ type: [FeeItemDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => FeeItemDto)
  feeItems: FeeItemDto[];
  @ApiProperty({ type: [InstallmentDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => InstallmentDto)
  installments: InstallmentDto[];
}

export enum PaymentMode {
  CASH = 'CASH', CHEQUE = 'CHEQUE', UPI = 'UPI', CARD = 'CARD',
  NETBANKING = 'NETBANKING', RAZORPAY = 'RAZORPAY', STRIPE = 'STRIPE',
}

export class CollectFeeDto {
  @ApiProperty() @IsUUID() studentId: string;
  @ApiProperty() @IsUUID() installmentId: string;
  @ApiProperty() @IsNumber() @Min(1) paidAmount: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() discount?: number;
  @ApiProperty({ enum: PaymentMode }) @IsEnum(PaymentMode) paymentMode: PaymentMode;
  @ApiPropertyOptional() @IsOptional() @IsString() transactionId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() remarks?: string;
}
