import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UsernameDocument = Username & Document;

export class Username {
  @Prop({ type: mongoose.Schema.Types.Number })
  _id: number;
  @Prop()
  username: string;
}

export const UsernameSchema = SchemaFactory.createForClass(Username);
