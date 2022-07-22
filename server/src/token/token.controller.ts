import { Controller, Get, Post, Body, Query, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { BuyTokenDto } from './dto/buy-token.dto';
import { EntryTokenDto } from './dto/entry-token.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('list')
  findTokenList(@Query() address: string): object {
    return this.tokenService.findTokenList(address);
  }
  @Get('qrcode')
  createTokenQR(@Query('address') address: string, @Query('token_id') token_id: string): any {
    return this.tokenService.createTokenQR(address, token_id);
  }

  @Post('qrcode/validation')
  checkValidation(@Body() nonce: string) {
    return this.tokenService.checkValidation(nonce);
  }

  @UseGuards(AuthGuard)
  @Post('/buy')
  async buyToken(@Body() body: BuyTokenDto, @Req() req: Request) {
    const message = await this.tokenService.buyToken(body, req.user);
    return { message };
  }

  @UseGuards(AuthGuard)
  @Post('/entry')
  async entryToken(@Body() body: EntryTokenDto, @Req() req: Request) {
    const message = await this.tokenService.entryToken(body, req.user);
    return { message };
  }

  // @Post()
  // create(@Body() createTokenDto: CreateTokenDto) {
  //   return this.tokenService.create(createTokenDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tokenService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTokenDto: UpdateTokenDto) {
  //   return this.tokenService.update(+id, updateTokenDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tokenService.remove(+id);
  // }
}
