import { Module } from '@nestjs/common';
import { AutobotService } from './autobot.service';
import { AutobotController } from './autobot.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AutobotController],
  providers: [AutobotService, PrismaService],
})
export class AutobotModule {}
