import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MentorDocument = Mentor & Document;

@Schema()
export class Mentor {
  @Prop({ required: true })
  name: string;

  @Prop()
  timeZone: string;

  @Prop()
  calendar: Date[];
}

export const MentorSchema = SchemaFactory.createForClass(Mentor);