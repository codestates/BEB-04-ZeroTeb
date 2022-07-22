import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nonce } from './schemas/token.schema';
import axios from 'axios';
import 'dotenv/config';
import { Holding } from './schemas/holding.schema';
import { Cron } from '@nestjs/schedule';
import { KlaytnService } from 'src/klaytn/klaytn.service';
import { BuyTokenDto } from './dto/buy-token.dto copy';
import { EntryTokenDto } from './dto/entry-token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel('Nonce') private readonly NonceModel: Model<Nonce>,
    @InjectModel('Holding') private readonly HoldingModel: Model<Holding>,
    private readonly klaytnService: KlaytnService,
  ) {}

  // 주소에 따른 token 목록 반환 함수
  async findTokenList(_address: string) {
    console.log('findTokenList');
    //주소가 보유하고 있는 token List를 DB에서 호출
    try {
      const address = Object.values(_address)[0];
      const tokenList = await this.HoldingModel.find({ address: address });
      if (tokenList.length <= 0) {
        return { message: 'no data' };
      }
      return tokenList;
    } catch (e) {
      console.log(e);
      return { message: 'Fail findTokenList' };
    }
  }

  // 주소와 token_id로 QR code 생성 및 nonce 발행하는 함수
  async createTokenQR(address: string, token_id: string) {
    console.log('createTokenQR');
    //유효한 계정(로그인)일 경우, 받은 주소에 해당 토큰 확인 (이 부분은 나중에 다른 데이터 확인해야함 Nonce X)
    // 계정(로그인) 확인 코드 필요
    try {
      let saveResult;
      const holdingdata = await this.HoldingModel.findOne({
        address: `${address}`,
        token_id: `${token_id}`,
      }).exec();
      //해당 주소가 없거나 주소에 토큰이 없으면 종료
      if (holdingdata === null) {
        return { message: 'address or token_id is not invalid' };
      }
      // 토큰을 가지고 있다면 nonce 발행 기록이 있는지 확인
      const noncedata = await this.NonceModel.findOne({
        address: `${address}`,
        token_id: `${token_id}`,
      }).exec();

      const now = new Date(); // 현재 날짜
      const ex = now.setMinutes(5); //유효기한 5분
      //만약 한 번도 nonce 발행 기록이 없다면 새로 발행
      if (noncedata === null) {
        console.log('nonce 새로 발행');
        //nonce값 생성, DB에 논스값 저장
        const newNonce = new this.NonceModel({
          address,
          token_id,
          date: ex,
        });
        saveResult = await newNonce.save();
      }
      //유효기한이 남았으면 유효기한 연장? 같은거 아직 뭐할지 안정함
      // else if (this.checkEx(noncedata.date)) {
      //   console.log('유효기한 남음');
      //   return { message: 'QR is expired' };
      // }
      // 유효기한 갱싱
      else {
        console.log('유효기한 지남');
        console.log('유효기한 갱신');
        await this.NonceModel.updateOne(
          { token_id: noncedata.token_id, address: noncedata.address },
          { $set: { date: ex } },
        );
        saveResult = noncedata;
      }
      console.log('QR 발행');

      //QR 생성 요청 API
      //참고 사이트 https://www.qr-code-generator.com/qr-code-api/?target=api-ad
      const nonce = saveResult._id; //nonce값은 무작이로 정해지는 _id값을 사용
      const text = `${address} ${token_id} ${nonce} format:(address, token_id, nonce)`;
      const api = process.env.QR_API_KEY;
      const param = {
        frame_name: 'no-frame',
        qr_code_text: text,
        image_format: 'SVG',
        image_width: 100,
      };
      //address와 token_id로 qrcode 생성
      const qr = await axios
        .post(`https://api.qr-code-generator.com/v1/create?access-token=${api}`, param)
        .then((res) => {
          return res.data;
        });
      console.log('발행 완료');
      return qr;
    } catch (e) {
      console.log(e);
      return { message: 'Fail to create QRcode ' };
    }
  }

  // QR 코드 생성시 발행한 nonce 값의 유효성 검사 함수
  async checkValidation(nonce: string) {
    console.log('checkValidation');
    //nonce가 유효한지 DB를 통해 확인
    try {
      const id = Object.values(nonce)[0];
      const validation = await this.NonceModel.findById(id);

      //해당 nonce의 유효기한이 남았는지 확인
      const valResult = this.checkEx(validation.date);

      let message: string;
      valResult ? (message = '유효한 QR') : (message = '유효하지 않은 QR');

      const nonceValidation = {
        message,
      };
      return nonceValidation;
    } catch (e) {
      console.log(e);
      return { message: 'Fail validation test' };
    }
  }

  // nonce의 유효기한이 남았는지 검사
  checkEx(date: string): boolean {
    try {
      const now = new Date(); // 현재 날짜
      const now_min = now.setMinutes(0);
      console.log(
        'date:',
        date,
        'now:',
        now_min,
        '유효기한(양수: 유효기한 남음):',
        Number(date) - now_min,
      );
      if (Number(date) > now_min) {
        return true; // 유효기한 남음
      } else {
        return false; // 유효기한 지남
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async buyToken(buyTokenDto: BuyTokenDto, user): Promise<string> {
    const eventId = buyTokenDto.event_id;
    const eventClassId = buyTokenDto.class_id;
    const number = buyTokenDto.number;

    try {
      const err = await this.klaytnService.buyToken(user.address, eventId, eventClassId, number);
      if (err) throw new Error('구매를 실패했습니다.');
      return '정상적으로 구매되었습니다.';
    } catch (error) {
      console.error(error);
      return '구매를 실패했습니다.';
    }
  }

  async entryToken(entryTokenDto: EntryTokenDto, user): Promise<string> {
    const eventId = entryTokenDto.event_id;

    try {
      const err = await this.klaytnService.applyToken(user.address, eventId);
      if (err) throw new Error('응모에 실패했습니다.');
      return '정상적으로 응모되었습니다.';
    } catch (error) {
      console.error(error);
      return '응모에 실패했습니다.';
    }
  }

  //사용자 address의 토큰을 읽어 오는 함수 - 매 초 실행
  // @Cron('*/30 * * * * *')
  // getHoldingData() {
  //   console.log('address에 따른 토큰 정보 받기');
  //   this.klaytnService.mintToken(1, 0);
  // }
}
