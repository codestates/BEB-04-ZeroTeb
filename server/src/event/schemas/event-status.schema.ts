import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type EventStatusDocument = EventStatus & Document;

@Schema()
export class EventStatus {
  @Prop({ type: mongoose.SchemaTypes.Number, required: true, unique: true })
  event_id: number;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  status:
    | 'created' // 이벤트 생성 완료
    | 'minting' // 이벤트 토큰 생성 중
    | 'minted' // 이벤트 토큰 생성 완료
    | 'selling' // 토큰 판매 중
    | 'applying' // 토큰 응모 중
    | 'preparing' // 이벤트 준비 중
    | 'progressing' // 이벤트 진행 중
    | 'end'; // 이벤트 종료
}

export const EventStatusSchema = SchemaFactory.createForClass(EventStatus);
