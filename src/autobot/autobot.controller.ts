import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { AutobotService } from './autobot.service';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('autobots')
@Controller('autobots')
export class AutobotController {
  constructor(private readonly autobotService: AutobotService) {}
  LIMIT = 10;

  @Get()
  @ApiOperation({ summary: 'Get Autobots: max result = 10' })
  @ApiQuery({
    name: 'skip',
    required: false,
    description: 'Number of records to skip, defaults to 0',
    example: 0,
  })
  getAutobots(
    @Query('skip', new ParseIntPipe({ optional: true })) skip: number = 0,
  ) {
    return this.autobotService.getAutobots(this.LIMIT, skip);
  }

  @ApiOperation({ summary: 'Get details of a specific Autobot' })
  @ApiParam({ name: 'autbotId', description: 'ID of the Autobot', example: 1 })
  @Get(':autbotId')
  getAutobot(@Param('autbotId', ParseIntPipe) autbotId: number) {
    return this.autobotService.getAutobot(autbotId);
  }

  @ApiOperation({ summary: 'Get posts associated with a specific Autobot' })
  @ApiParam({ name: 'autbotId', description: 'ID of the Autobot', example: 1 })
  @Get(':autbotId/posts')
  getAutobotPosts(@Param('autbotId', ParseIntPipe) autbotId: number) {
    return this.autobotService.getAutobotPosts(autbotId);
  }

  @ApiOperation({ summary: 'Get comments associated with a specific post' })
  @ApiParam({ name: 'postId', description: 'ID of the post', example: 1 })
  @Get(':postId/comments')
  getAutobotComments(@Param('postId', ParseIntPipe) postId: string) {
    return this.autobotService.getAutobotPostComments(+postId);
  }
}
