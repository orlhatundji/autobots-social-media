import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AutobotModule } from './autobot/autobot.module';
import { AutobotService } from './autobot/autobot.service';
import { PrismaService } from './prisma.service';
import { AutobotSchedulerService } from './autobot-scheduler/autobot-scheduler.service';
import { AutobotGateway } from './autobot/autobot.gateway';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 5,
      },
    ]),
    ScheduleModule.forRoot(),
    AutobotModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AutobotService,
    PrismaService,
    AutobotSchedulerService,
    AutobotGateway,
  ],
})
export class AppModule {}
