import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AutobotService {
  constructor(private prismaService: PrismaService) {}

  async createAutobot(data): Promise<any> {
    return this.prismaService.autobot.create({
      data: {
        name: data.name,
        posts: {
          create: data.posts.map((post) => ({
            title: post.title,
            content: post.content,
            comments: {
              create: post.comments.map((comment) => ({
                content: comment.content,
              })),
            },
          })),
        },
      },
    });
  }

  async getAutobots(limit: number, skip: number): Promise<any> {
    return this.prismaService.autobot.findMany({
      take: limit,
      skip: skip,
      include: {
        posts: {
          include: {
            comments: true,
          },
        },
      },
    });
  }
}
