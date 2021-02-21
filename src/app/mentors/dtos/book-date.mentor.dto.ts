import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { IsValidBookedDate } from '../validators/valid-booked-date.validator';

export class BookDateDto {
  @IsNotEmpty()
  @IsDateString()
  @IsValidBookedDate()
  @ApiProperty({ required: true })
  date: Date;
}
