import { Injectable } from '@nestjs/common';
import { SignInReqDto, SignInResDto } from './dto/signin-auth.dto';
import Axios, { AxiosRequestConfig } from 'axios';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(signInReqDto: SignInReqDto): Promise<SignInResDto> {
    const signInResDto: SignInResDto = new SignInResDto();
    const axiosConfig: AxiosRequestConfig = {
      method: 'get',
      url: 'https://a2a-api.klipwallet.com/v2/a2a/result',
      params: {
        request_key: signInReqDto.request_key,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const resultData = await (await Axios(axiosConfig)).data;
      console.log(resultData);
      if (Date.now() > resultData.expiration_time * 1000) throw new Error('시간 초과');
      signInResDto.setStatus(resultData.status);
      if (resultData.status === 'completed') {
        signInResDto.setAddress(resultData.result.klaytn_address);
        signInResDto.setMessage('로그인에 성공했습니다.');
      } else if (resultData.status === 'prepared') {
        signInResDto.setMessage('로그인을 진행 중입니다.');
      } else throw new Error();
    } catch (err) {
      console.error(err);
      signInResDto.setMessage('로그인에 실패했습니다.');
      signInResDto.setStatus('failure');
    }
    return signInResDto;
  }

  signInJWT(signInResDto: SignInResDto) {
    const payload = {
      address: signInResDto.address,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  verifyJWT(jwt: string) {
    const accessToken = this.jwtService.verify(jwt);
    console.log(accessToken);
    return 'good';
  }
}
