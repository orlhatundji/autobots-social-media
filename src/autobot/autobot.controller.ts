import { Controller, Get, Param, Query } from '@nestjs/common';
import { AutobotService } from './autobot.service';

@Controller('autobots')
export class AutobotController {
  constructor(private readonly autobotService: AutobotService) {}

  @Get()
  getAutobots(@Query('skip') skip: number = 0) {
    const limit = 10;
    return this.autobotService.getAutobots(limit, skip);
  }
  @Get(':autbotId')
  getAutobot(@Param('autbotId') autbotId: number) {
    return this.autobotService.getAutobot(+autbotId);
  }

  @Get(':autbotId/posts')
  getAutobotPosts(@Param('autbotId') autbotId: string) {
    return this.autobotService.getAutobotPosts(+autbotId);
  }

  @Get(':postId/comments')
  getAutobotComments(@Param('postId') postId: string) {
    return this.autobotService.getAutobotPostComments(+postId);
  }
}
