import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookDateDto } from './dtos/book-date.mentor.dto';
import { CreateMentorDto } from './dtos/create.mentor.dto';
import { MentorDto } from './dtos/mentor.dto';
import { UnavailableSlotError } from './errors/unavailable-slot.error';
import { IMentor } from './interfaces/mentor.interface';
import { MentorsService } from './mentors.service';

@ApiTags('mentors')
@Controller('mentors')
export class MentorsController {
  constructor(private mentorsService: MentorsService) {}

  @Post('/')
  @ApiCreatedResponse({
    description: 'The mentor has been successfully created.',
    type: MentorDto,
  })
  async create(@Body() createMentorDto: CreateMentorDto): Promise<IMentor> {
    const mentor = await this.mentorsService.create(createMentorDto);
    return mentor;
  }

  @Get(':id')
  @ApiResponse({
    description: 'The mentor has been successfully retrieved.',
    type: MentorDto,
    status: 200,
  })
  async find(@Param('id') id: string): Promise<IMentor> {
    const mentor = await this.mentorsService.find(id);
    return mentor;
  }

  @Get(':id/calendar')
  @ApiResponse({
    description:
      'The mentor calendar for the specified date has been successfully retrieved.',
    type: MentorDto,
    status: 200,
  })
  async getCalendar(
    @Param('id') id: string,
    @Query('date') date: string,
  ): Promise<IMentor> {
    const mentor = await this.mentorsService.getCalendar(id, date);
    return mentor;
  }

  @Post(':id/calendar')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    description: 'Date has been successfully added to the calendar.',
    type: MentorDto,
    status: 200,
  })
  async addToCalendar(
    @Param('id') id: string,
    @Body() bookDateDto: BookDateDto,
  ): Promise<any> {
    try {
      const mentor = await this.mentorsService.addToCalendar(
        id,
        bookDateDto.date,
      );
      return mentor;
    } catch (error) {
      if (error instanceof UnavailableSlotError) {
        throw new BadRequestException('Slot unavailable for booking');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
