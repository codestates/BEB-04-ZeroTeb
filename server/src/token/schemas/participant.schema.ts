import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ParticipantDocument = Participant & Document;

@Schema()
export class Participant {
  @Prop({ type: mongoose.SchemaTypes.Number })
  event_id: number;

  @Prop({ type: mongoose.SchemaTypes.String })
  address: string;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
