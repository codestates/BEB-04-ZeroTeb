import { Controller, Get, Post, Body, Req, Res, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignInReqDto } from './dto/signin-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signIn(@Body() body: SignInReqDto, @Res() res: Response): Promise<void> {
    console.log(body);
    const service = await this.authService.signIn(body);
    const accessToken = this.authService.signInJWT(service);
    if (service.status === 'failure') {
      res.status(400).json(service);
    } else {
      res
        .status(200)
        .cookie('access_token', accessToken, { maxAge: 1000 * 60 * 30 })
        .json(service);
    }
  }
  @Get('/verify')
  verify(@Req() req: Request) {
    console.log(req);
    const { access_token } = req.cookies;
    if (access_token === undefined) new BadRequestException();
    return this.authService.verifyJWT(access_token);
  }
}
