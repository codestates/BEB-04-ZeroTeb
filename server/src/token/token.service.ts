import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import axios from 'axios';

@Injectable()
export class TokenService {
  findTokenList(address: string): object {
    //주소로 DB에 데이터 호출

    //반환할 토큰 데이터
    const tokenList = {
      token_id: '123456',
      token_image_url: 'http://sdts.dsf',
    };
    return tokenList;
  }
  async createTokenQR(address: string, token_id: string) {
    //참고 사이트 https://www.qr-code-generator.com/qr-code-api/?target=api-ad
    const api = 'dxwHbK-0SruyZkyTJ-fWpxtAI78NENxPrKbqPOY9a7kTtcy0Izji4v1-1LeUl1-J';
    const param = {
      frame_name: 'no-frame',
      qr_code_text: address,
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
  checkValidation(nonce: string) {
    //nonce가 유효한지 확인

    const nonceValidation = {
      message: '유효성 검사 결과',
      nonce: '필요한가? nonce',
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
