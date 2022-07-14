import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('create')
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get('list')
  findEventList(@Query('page') page: number, @Query('count') count: number) {
    return this.eventService.findList(page, count);
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
  //   return this.eventService.update(+id, updateEventDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.eventService.remove(+id);
  // }
}
