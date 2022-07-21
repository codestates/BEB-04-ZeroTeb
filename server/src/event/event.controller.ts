import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Req,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  createEvent(@Body() createEventDto: CreateEventDto, @Req() req: Request) {
    return this.eventService.create(createEventDto, req.user);
  }

  @Get('list')
  findEventList(
    @Query('page') page: number,
    @Query('count') count: number,
    @Query('category') category: string,
    @Query('region') region: string,
  ) {
    return this.eventService.findList(page, count, category, region);
  }

  @Get('item')
  findOne(@Query('event_id') event_id: number) {
    return this.eventService.findOne(event_id);
  }

  @Get('entry')
  confirmWin(@Query('event_id') event_id: number, @Query('address') address: string) {
    return this.eventService.findWin(event_id, address);
  }

  @Get('history')
  typeList(
    @Query('address') address: string,
    @Query('type') type: string,
    @Query('page') page: number,
    @Query('count') count: number,
  ) {
    return this.eventService.findTypeList(address, type, page, count);
  }

  @Get('search')
  search(@Query('keyword') keyword: string) {
    return this.eventService.findByKeyword(keyword);
  }

  @Get('location')
  findLocation(@Query('lat') lat: number, @Query('lon') lon: number) {
    return this.eventService.findAroundEvent(lat, lon);
  }

  @Get('banner')
  findBanner() {
    return this.eventService.getBanner();
  }
}
