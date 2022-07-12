import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import axios from 'axios';
import 'dotenv/config';

@Injectable()
export class TokenService {
  // 주소에 따른 token 목록 반환 함수
  findTokenList(address: string): object {
    //주소가 보유하고 있는 token List를 DB에서 호출

    //반환할 토큰 데이터
    const tokenList = [
      {
        token_id: '123456',
        token_image_url: 'http://sdts.dsf',
      },
      {
        token_id: '65413',
        token_image_url: 'http://sdㄴㅇㄹts.dsf',
      },
    ];
    return tokenList;
  }

  // 주소와 token_id로 QR code 생성 및 nonce 발행하는 함수
  async createTokenQR(address: string, token_id: string) {
    //유효한 계정일 경우, 받은 주소에 해당 토큰 확인

    //nonce값 생성, DB에 논스값 저장

    const nonce = '0'; //임시 nonce
    const text = address + token_id + nonce;
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

    return qr;
  }

  // QR 코드 생성시 발행한 nonce 값의 유효성 검사 함수
  checkValidation(nonce: string) {
    //nonce가 유효한지 DB를 통해 확인

    const validation = true;
    let message: string;
    validation ? (message = '유효한 nonce') : (message = '유효하지 않은 nonce');

    const nonceValidation = {
      message: message,
    };
    return nonceValidation;
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
