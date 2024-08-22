import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import axios from 'axios';

@Injectable()
export class AutobotService {
  constructor(private prismaService: PrismaService) {}
  contentMax = 190;

  async createAutobot(name: string): Promise<any> {
    try {
      const postsResponse = await axios.get(
        'https://jsonplaceholder.typicode.com/posts?_limit=2',
      );
      const posts = postsResponse.data;

      const postsWithUniqueTitles = await Promise.all(
        posts.map(async (post, index) => {
          let uniqueTitle = post.title;

          let titleExists = await this.prismaService.post.findUnique({
            where: { title: uniqueTitle },
          });

          while (titleExists) {
            uniqueTitle = `${post.title}-${index}-${Date.now()}`;
            titleExists = await this.prismaService.post.findUnique({
              where: { title: uniqueTitle },
            });
          }

          const commentsResponse = await axios.get(
            'https://jsonplaceholder.typicode.com/comments?_limit=2',
          );
          const comments = commentsResponse.data.map((comment) => ({
            content:
              comment.body.length > this.contentMax
                ? comment.body.substring(0, this.contentMax)
                : comment.body,
          }));

          return {
            title: uniqueTitle,
            content:
              post.body.length > this.contentMax
                ? post.body.substring(0, this.contentMax)
                : post.body,
            comments: {
              create: comments,
            },
          };
        }),
      );

      return this.prismaService.autobot.create({
        data: {
          name: name,
          posts: {
            create: postsWithUniqueTitles,
          },
        },
      });
    } catch (error) {
      console.error('Error creating Autobot:', error);
      throw new Error('Failed to create Autobot');
    }
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
