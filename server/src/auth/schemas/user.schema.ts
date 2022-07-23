import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  _id: number;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  address: string;

  @Prop({ required: true, unique: true })
  test_address: string;

  @Prop({ required: true, unique: true })
  test_private_key: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
