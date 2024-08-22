import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AutobotService } from 'src/autobot/autobot.service';

@Injectable()
export class AutobotSchedulerService {
  private readonly logger = new Logger(AutobotSchedulerService.name);
  constructor(private autobotService: AutobotService) {}

  @Cron(CronExpression.EVERY_HOUR) // every minute
  async handleCron() {
    this.logger.debug('Called every minute');
    for (let i = 0; i < 2; i++) {
      const autobot = `Autobot-${Date.now()}-${i}`;
      console.log(autobot);
      // await this.autobotService.createAutobot(autobot);
    }
  }
}
