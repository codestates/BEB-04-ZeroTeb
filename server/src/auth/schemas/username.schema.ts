import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UsernameDocument = Username & Document;

export class Username {
  @Prop({ required: true })
  username: string;
  @Prop({ required: true, unique: true })
  index: number;
}

export const UsernameSchema = SchemaFactory.createForClass(Username);
