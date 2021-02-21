import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mentor, MentorSchema } from './mentor.schema';
import { MentorsController } from './mentors.controller';
import { MentorsService } from './mentors.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mentor.name, schema: MentorSchema }]),
  ],
  controllers: [MentorsController],
  providers: [MentorsService],
  exports: [MentorsService],
})
export class MentorsModule {}
