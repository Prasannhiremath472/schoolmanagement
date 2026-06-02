import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsNotEmpty, Matches } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateSchoolDto {
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty({ description: 'Unique slug for subdomain (lowercase, hyphens only)', example: 'springdale-school' })
  @IsString()
  @Matches(/^[a-z0-9-]+$/, { message: 'Slug must be lowercase alphanumeric with hyphens only' })
  slug: string;
  @ApiProperty() @IsEmail() email: string;
  @ApiPropertyOptional() @IsOptional() @IsString() phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() address?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() city?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() state?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() country?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() timezone?: string;
  @ApiProperty({ description: 'School admin email' }) @IsEmail() adminEmail: string;
  @ApiPropertyOptional() @IsOptional() @IsString() adminPassword?: string;
}

export class UpdateSchoolDto extends PartialType(CreateSchoolDto) {}
