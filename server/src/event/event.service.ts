import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './schemas/event.schema';
import { EventResult } from './schemas/eventResult.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event') private readonly EventModel: Model<Event>,
    @InjectModel('EventResult') private readonly EventResultModel: Model<EventResult>,
  ) {}

  // 이벤트 등록 함수
  async create(createEventDto: CreateEventDto) {
    console.log('create');
    // 유효성 검사 필요
    try {
      // 최신 event_id 가져와서 다음 evnet_id 생성
      // 기존 데이터 없으면 오류 발생해서 next_evnet_id는 0으로 사용
      let next_event_id = 0;
      try {
        const lastEvent = await this.EventModel.find().sort({ event_id: -1 }).limit(1);
        lastEvent[0].event_id >= 0 ? (next_event_id = lastEvent[0].event_id + 1) : null;
      } catch (e) {
        console.log('아무 데이터 없음');
      }
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
        event_id: next_event_id,
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
    } catch (e) {
      console.log(e);
      return { message: 'Failed to create event' };
    }
  }

  // 이벤트 목록을 반환하는 함수 - 아마도 페이지와 띄울 컨텐츠 갯수라고 생각하고 작성
  async findList(page: number, count: number) {
    console.log('findList');
    try {
      // 현재 페이지에 나오는 event_id 계산
      const content_count: number = page * count;
      // 조건에 맞는 이벤트 찾기
      const eventList = await this.EventModel.find({
        event_id: { $lte: content_count, $gte: content_count - count },
      });
      if (eventList.length <= 0) {
        return { message: 'The events were not found' };
      }
      return eventList;
    } catch (e) {
      console.log(e);
      return { message: 'Failed to find eventList' };
    }
  }

  // 특정 event_id를 가진 이벤트를 반환하는 함수
  async findOne(event_id: number) {
    console.log('findOne');
    try {
      const event = await this.EventModel.findOne({ event_id });
      console.log('event:', event);
      // 특정 event_id를 가진 이벤트가 없으면 실패
      if (!event) {
        return { message: 'The event was not found' };
      }
      return event;
    } catch (e) {
      console.log(e);
      return { message: 'Failed to find event' };
    }
  }

  async findWin(event_id: number, address: string) {
    try {
      const eventResult = await this.EventResultModel.find({
        event_id: event_id,
        address: address,
      });
      //당첨된 내역이 없을 경우
      if (eventResult.length <= 0) {
        return { message: 'There is no winning history' };
      }
      return eventResult;
    } catch (e) {
      console.log(e);
      return { message: 'Failed to retrieve result' };
    }
  }

  //type : created, entry, sale, liked
  findTypeList(address: string, type: string, page: number, count: number) {
    console.log(address, type, page, count);
    try {
      switch (type) {
        case 'created':
          console.log('create');
          break;
        case 'entry':
          break;
        case 'sale':
          break;
        case 'liked':
          break;

        default:
          break;
      }
      return 'typeList';
    } catch (e) {
      console.log(e);
      return { message: 'Failed to find List' };
    }
  }
}
