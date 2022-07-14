import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nonce } from './schemas/token.schema';
import axios from 'axios';
import 'dotenv/config';
import { Holding } from './schemas/holding.schema';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel('Nonce') private readonly NonceModel: Model<Nonce>,
    @InjectModel('Holding') private readonly HoldingModel: Model<Holding>,
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
      //유효기한이 남았으면 유효기한 연장? 같은거 아직 뭐할지 안정함
      if (this.checkEx(noncedata.date)) {
        console.log('유효기한 남음');
        return { message: 'QR is expired' };
      }
      console.log('유효기한 지남');
      console.log('재발행');
      //유효기한이 지났으면 새로 발행====================
      const ex = now.setMinutes(5); //유효기한 5분
      //nonce값 생성, DB에 논스값 저장
      const newNonce = new this.NonceModel({
        address,
        token_id,
        date: ex,
      });
      const saveResult = await newNonce.save();

      const nonce = saveResult._id; //nonce값은 무작이로 정해지는 _id값을 사용
      const text = `${address} ${token_id} ${nonce} format:(address, token_id, nonce)`;
      //QR 생성 요청 API
      //참고 사이트 https://www.qr-code-generator.com/qr-code-api/?target=api-ad

      const api = process.env.QR_API_KEY;
      const param = {
        frame_name: 'no-frame',
        qr_code_text: text,
        image_format: 'SVG',
        image_width: 100,
        qr_code_logo: 'scan-me-square',
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
      console.log(date, now_min);
      if (date > now_min.toString()) {
        return true; // 유효기한 남음
      } else {
        return false; // 유효기한 지남
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  // create(createTokenDto: CreateTokenDto) {
  //   return 'This action adds a new token';
  // }

  // findAll() {
  //   return `This action returns all token`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} token`;
  // }

  // update(id: number, updateTokenDto: UpdateTokenDto) {
  //   return `This action updates a #${id} token`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} token`;
  // }
}
