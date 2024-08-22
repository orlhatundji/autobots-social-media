import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { AutobotService } from './autobot.service';

@Controller('autobots')
export class AutobotController {
  constructor(private readonly autobotService: AutobotService) {}
  LIMIT = 10;

  @Get()
  getAutobots(
    @Query('skip', new ParseIntPipe({ optional: true })) skip: number = 0,
  ) {
    return this.autobotService.getAutobots(this.LIMIT, skip);
  }

  @Get(':autbotId')
  getAutobot(@Param('autbotId', ParseIntPipe) autbotId: number) {
    return this.autobotService.getAutobot(autbotId);
  }

  @Get(':autbotId/posts')
  getAutobotPosts(@Param('autbotId', ParseIntPipe) autbotId: number) {
    return this.autobotService.getAutobotPosts(autbotId);
  }

  @Get(':postId/comments')
  getAutobotComments(@Param('postId', ParseIntPipe) postId: string) {
    return this.autobotService.getAutobotPostComments(+postId);
  }
}
