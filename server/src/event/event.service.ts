import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './schemas/event.schema';
import { EventResult } from './schemas/eventResult.schema';
import { LikedEvent } from './schemas/likedEvent.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import 'dotenv/config';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event') private readonly EventModel: Model<Event>,
    @InjectModel('EventResult') private readonly EventResultModel: Model<EventResult>,
    @InjectModel('LikedEvent') private readonly LikedEventModel: Model<LikedEvent>,
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
        promoter,
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
        remaining,
      } = createEventDto;
      // location의 데이터를 분리해서 도, 시 까지만 사용
      const sliceLocation = location.split(' ');
      const sL = `${sliceLocation[0]} ${sliceLocation[1]}`;
      // 한글로 입력된 이벤트 장소를 좌표로 바꿈
      const header = { Authorization: process.env.KAKAO_API };
      const point = await axios
        .get(`https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(sL)}`, {
          headers: header,
        })
        .then((res) => {
          return res.data;
        });

      const eventData = {
        event_id: next_event_id,
        title,
        promoter,
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
        x: point.documents[0].x, //location 기반 좌표 lat
        y: point.documents[0].y, //location 기반 좌표 lon
        status: '진행 중',
        remaining,
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
  // type에 따라 다른 목록을 보여주는 함수
  async findTypeList(address: string, type: string, page: number, count: number) {
    console.log('findTypeList');
    const content_count = page * count;
    let resultList: object;
    //page랑 count 현재 적용 안함 - 논의 후 적용예정
    try {
      switch (type) {
        // 내 주소로 만든 이벤트
        case 'created':
          console.log('created', type);
          resultList = await this.EventModel.find({ address: address });
          break;
        // 응모성 이벤트
        case 'entry':
          console.log('entry');
          resultList = await this.EventModel.find({ type: 'entry' });
          break;
        // 판매성 이벤트
        case 'sale':
          console.log('sale');
          resultList = await this.EventModel.find({ type: 'sale' });
          break;
        // 내가 좋아요 누른 이벤트
        case 'liked':
          console.log('liked');
          const likedList = await this.LikedEventModel.find({ address: address });
          const likedId = likedList.map((ele) => ele.event_id);
          resultList = await this.EventModel.find({ event_id: likedId });
          break;
        default:
          console.log('default');
          break;
      }
      return resultList;
    } catch (e) {
      console.log(e);
      return { message: 'Failed to find List' };
    }
  }

  // 검색 키워드로 키워드를 포함한 이벤트 검색
  async findByKeyword(keyword: string) {
    console.log('findByKeyword');
    try {
      const searchList = await this.EventModel.find({ title: { $regex: '.*' + keyword + '.*' } });
      if (searchList.length <= 0) {
        return { message: `No result found as ${keyword}` };
      }
      return searchList;
    } catch (e) {
      console.log(e);
      return { message: 'Failed to search' };
    }
  }

  async findAroundEvent(lat: number, lon: number) {
    console.log('findAroundEvent');
    try {
      const threshold = 50; // 내 주변 탐색 범위 (단위 km)
      // API 사용을 위한 key를 헤더에 셋팅
      const header = { Authorization: process.env.KAKAO_API };
      // 사용자의 좌표 받아서 사용자가 있는 장소(행정구역) 구하기
      const apiResult = await axios
        .get(`https://dapi.kakao.com//v2/local/geo/coord2address.json?x=${lon}&y=${lat}`, {
          headers: header,
        })
        .then((res) => {
          return res.data;
        });
      const region = apiResult.documents[0].address.region_1depth_name; // 행정구역
      console.log('현재 지역:', region);
      // const tetsregion = '경상남도'; //test data
      // 사용자가 있는 장소(행정구역)에 진행중인 이벤트 모두 호출
      const regionEventList = await this.EventModel.find({
        location: { $regex: '.*' + region + '.*' },
      });
      console.log(`${region}지역 이벤트:`, regionEventList);
      // 호출된 이벤트와 사용자의 좌표의 거리가 threshold 이하인 데이터만 추출
      const aroundEvent = regionEventList.filter(
        (ele) => this.getDistance(lat, lon, ele.x, ele.y) < threshold,
      );
      return aroundEvent;
    } catch (e) {
      console.log(e);
      return { message: 'Failed to find around event' };
    }
  }

  // 좌표 2개의 위치를 비교해 거리 구하는 함수
  getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    if (lat1 == lat2 && lon1 == lon2) return 0;

    const radLat1 = (Math.PI * lat1) / 180;
    const radLat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radTheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radLat1) * Math.sin(radLat2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist > 1) dist = 1;

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344 * 1000;
    if (dist < 100) dist = Math.round(dist / 10) * 10;
    else dist = Math.round(dist / 100) * 100;

    return dist / 1000;
  }

  async getBanner() {
    console.log('getBanner');
    try {
      const bannerEvent = await this.EventModel.find({ banner: true });
      return bannerEvent;
    } catch (e) {
      console.log(e);
      return { message: 'Fail to import ad' };
    }
  }

  //이벤트 리스트 받아서 holdings에 업데이트
  @Cron('* * * * * *')
  getEventList() {
    console.log('이벤트 리스트 받기');
  }
}
