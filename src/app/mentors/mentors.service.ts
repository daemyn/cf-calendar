import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IMentor } from './interfaces/mentor.interface';
import { Mentor, MentorDocument } from './mentor.schema';
import * as moment from 'moment';
import { UnavailableSlotError } from './errors/unavailable-slot.error';

@Injectable()
export class MentorsService {
  constructor(
    @InjectModel(Mentor.name) private mentorModel: Model<MentorDocument>,
  ) {}

  async create(createMentorDto: any): Promise<IMentor> {
    const mentor = new this.mentorModel({
      ...createMentorDto,
      calendar: [],
    });
    return mentor.save();
  }

  async find(id: string): Promise<IMentor> {
    return this.mentorModel.findById(id);
  }

  async getCalendar(id: string, date: string): Promise<IMentor> {
    const startDate = moment(date);
    startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    const endDate = moment(date);
    endDate.set({ hour: 23, minute: 59, second: 59, millisecond: 59 });
    const res = await this.mentorModel
      .aggregate()
      .match({ _id: Types.ObjectId(id) })
      .project({
        name: '$name',
        timeZone: '$timeZone',
        calendar: {
          $filter: {
            input: '$calendar',
            as: 'date',
            cond: {
              $and: [
                {
                  $gte: ['$$date', new Date(startDate.toISOString())],
                },
                {
                  $lte: ['$$date', new Date(endDate.toISOString())],
                },
              ],
            },
          },
        },
      })
      .exec();
    return res.length > 0 ? res[0] : null;
  }

  async checkAvailableDate(id: string, bookedDate: Date): Promise<boolean> {
    const count = await this.mentorModel
      .find({
        _id: id,
        calendar: new Date(bookedDate),
      })
      .count()
      .exec();
    return count === 0;
  }

  async addToCalendar(id: string, bookedDate: Date): Promise<IMentor> {
    const isAvailableDate = await this.checkAvailableDate(id, bookedDate);
    if (!isAvailableDate) {
      throw new UnavailableSlotError();
    }
    return this.mentorModel.findByIdAndUpdate(
      id,
      { $push: { calendar: new Date(bookedDate) } },
      { new: true },
    );
  }
}
