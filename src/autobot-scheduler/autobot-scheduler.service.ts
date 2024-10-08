import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AutobotService } from 'src/autobot/autobot.service';

@Injectable()
export class AutobotSchedulerService {
  private readonly logger = new Logger(AutobotSchedulerService.name);
  constructor(private autobotService: AutobotService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.debug('Creating 500 Autobots...');
    for (let i = 0; i < 500; i++) {
      const autobot = `Autobot-${Date.now()}-${i}`;
      await this.autobotService.createAutobot(autobot);
    }
  }
}
