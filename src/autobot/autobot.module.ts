import { Module } from '@nestjs/common';
import { AutobotService } from './autobot.service';
import { AutobotController } from './autobot.controller';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AutobotGateway } from './autobot.gateway';

@Module({
  controllers: [AutobotController],
  providers: [
    AutobotService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AutobotGateway,
  ],
})
export class AutobotModule {}
