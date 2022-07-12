import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

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
