import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'; // luật kiểm tra
import { TaskStatus } from '../task.entity'; // dùng lại đúng 3 ds trạng thái, không khai báo lần 2

export class CreateTaskDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'title phải là chuỗi' })
  @IsNotEmpty({ message: 'title không được để trống' })
  @MaxLength(100, { message: 'title tối đa 100 ký tự' })
  title: string;

  @IsOptional() // không gửi thì sẽ bỏ qua luật bên dưới
  @IsString()
  description?: string;

  @IsOptional() // không gửi thì sẽ bỏ qua luật bên dưới
  @IsEnum(TaskStatus, { message: 'status phải là TODO, IN_PROGRESS hoặc DONE' })
  status?: TaskStatus;

  @IsOptional()
  @IsDateString({}, { message: 'dueDate phải là ngày hợp lệ (ISO 8601)' })
  dueDate?: string;
}
