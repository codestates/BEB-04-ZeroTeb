import { Controller, Get, Post, Body, Req, Res, Query, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInReqDto } from './dto/signin-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signIn(@Body() body: SignInReqDto, @Res() res: Response): Promise<void> {
    console.log(body);
    const service = await this.authService.signIn(body);
    if (service.status === 'failure') {
      res.status(400).json(service);
    } else if (service.status === 'prepared') {
      res.status(200).json(service);
    } else {
      const accessToken = this.authService.signInJWT(service);
      res
        .status(200)
        .cookie('access_token', accessToken, { maxAge: 1000 * 60 * 30 })
        .json(service);
    }
  }

  @Get('/userInfo')
  async userInfo(@Query('address') address: string, @Res() res: Response): Promise<void> {
    const service = await this.authService.userInfo(address);
    res.status(200).json(service);
  }

  @UseGuards(AuthGuard)
  @Get('/verify')
  verify(@Req() req: Request) {
    const { access_token } = req.cookies;
    return this.authService.verifyJWT(access_token);
  }
}
