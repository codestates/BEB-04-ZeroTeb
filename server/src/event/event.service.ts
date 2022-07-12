import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './schemas/event.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EventService {
  constructor(@InjectModel('Event') private readonly EventModel: Model<Event>) {}

  // 이벤트 등록 함수
  async create(createEventDto: CreateEventDto) {
    // 유효성 검사 필요
    const {
      title,
      address,
      location,
      category,
      type,
      thumnail,
      token_image_url,
      price,
      contents,
      option,
      recruit_start_date,
      recruit_end_date,
      event_start_date,
      event_end_date,
      created_date,
      modified_date,
    } = createEventDto;
    const eventData = {
      title,
      address,
      location,
      category,
      type,
      thumnail,
      token_image_url,
      price,
      contents,
      option,
      recruit_start_date,
      recruit_end_date,
      event_start_date,
      event_end_date,
      created_date,
      modified_date,
    };
    const saveEvent = new this.EventModel(eventData);
    const saveResult = await saveEvent.save();
    console.log(createEventDto);
    return saveResult;
  }

  findAll() {
    return `This action returns all event`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
