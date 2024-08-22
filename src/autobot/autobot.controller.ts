import { Controller, Get, Query } from '@nestjs/common';
import { AutobotService } from './autobot.service';

@Controller('autobots')
export class AutobotController {
  constructor(private readonly autobotService: AutobotService) {}

  @Get()
  async getAutobots(
    @Query('limit') limit: number = 10,
    @Query('skip') skip: number = 0,
  ) {
    return this.autobotService.getAutobots(limit, skip);
  }
}
