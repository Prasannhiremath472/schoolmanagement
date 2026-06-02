import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString, IsUUID, IsDateString, IsArray, IsNumber,
  IsOptional, IsBoolean, ValidateNested, Min, Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ExamTimetableDto {
  @ApiProperty() @IsUUID() subjectId: string;
  @ApiProperty() @IsDateString() examDate: string;
  @ApiProperty() @IsString() startTime: string;
  @ApiProperty() @IsString() endTime: string;
  @ApiPropertyOptional() @IsOptional() @IsString() venue?: string;
  @ApiProperty() @IsNumber() maxMarks: number;
  @ApiProperty() @IsNumber() passMarks: number;
}

export class CreateExamScheduleDto {
  @ApiProperty() @IsUUID() examTypeId: string;
  @ApiProperty() @IsUUID() classId: string;
  @ApiProperty() @IsUUID() academicYearId: string;
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsDateString() startDate: string;
  @ApiProperty() @IsDateString() endDate: string;
  @ApiProperty({ type: [ExamTimetableDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => ExamTimetableDto)
  timetable: ExamTimetableDto[];
}

export class MarkRecordDto {
  @ApiProperty() @IsUUID() studentId: string;
  @ApiProperty() @IsUUID() subjectId: string;
  @ApiProperty() @IsNumber() @Min(0) marksObtained: number;
  @ApiProperty() @IsNumber() @Min(1) maxMarks: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isAbsent?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() remarks?: string;
}

export class BulkMarksDto {
  @ApiProperty() @IsUUID() examScheduleId: string;
  @ApiProperty() @IsUUID() sectionId: string;
  @ApiProperty({ type: [MarkRecordDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => MarkRecordDto)
  marks: MarkRecordDto[];
}

export class EnterMarksDto {
  @ApiProperty() @IsUUID() studentId: string;
  @ApiProperty() @IsUUID() examScheduleId: string;
  @ApiProperty() @IsUUID() subjectId: string;
  @ApiProperty() @IsUUID() sectionId: string;
  @ApiProperty() @IsNumber() @Min(0) marksObtained: number;
  @ApiProperty() @IsNumber() @Min(1) maxMarks: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isAbsent?: boolean;
}
