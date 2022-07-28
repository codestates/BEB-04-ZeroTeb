import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { access_token } = request.cookies;

    if (access_token === undefined) {
      throw new HttpException('cannot found the access_token.', HttpStatus.UNAUTHORIZED);
    }

    request.user = this.validateToken(access_token);
    return true;
  }
  validateToken(token: string) {
    const secretKey = process.env.JWT_SECRET_KEY || '';

    try {
      const verify = this.jwtService.verify(token, { secret: secretKey });
      const { address, username } = verify;

      return { address, username };
    } catch (e) {
      console.error(e);
      switch (e.message) {
        // 토큰에 대한 오류를 판단합니다.
        case 'INVALID_TOKEN':
        case 'TOKEN_IS_ARRAY':
        case 'NO_USER':
          throw new HttpException('유효하지 않은 토큰입니다.', 401);

        case 'EXPIRED_TOKEN':
          throw new HttpException('토큰이 만료되었습니다.', 410);

        default:
          throw new HttpException('서버 오류입니다.', 500);
      }
    }
  }
}
