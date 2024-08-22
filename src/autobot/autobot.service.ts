import { HttpException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import axios from 'axios';

@Injectable()
export class AutobotService {
  constructor(private prismaService: PrismaService) {}

  private readonly CONTENTMAX = 190;
  private readonly TAKE = 10;
  private readonly logger = new Logger(AutobotService.name);

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
              comment.body.length > this.CONTENTMAX
                ? comment.body.substring(0, this.CONTENTMAX)
                : comment.body,
          }));

          return {
            title: uniqueTitle,
            content:
              post.body.length > this.CONTENTMAX
                ? post.body.substring(0, this.CONTENTMAX)
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
    });
  }

  async getAutobot(autbotId: number): Promise<any> {
    try {
      const bot = await this.prismaService.autobot.findUnique({
        where: { id: autbotId },
      });
      if (!bot) return new HttpException('Autobot not found', 404);
      return bot;
    } catch (error) {
      this.logger.error('Error getting Autobot:', error);
      return new HttpException('Oops, Something went wrong', 500);
    }
  }

  async getAutobotPosts(autbotId: number): Promise<any> {
    try {
      const posts = await this.prismaService.post.findMany({
        where: { autbotId },
        take: this.TAKE,
      });
      return posts;
    } catch (error) {
      this.logger.error('Error getting Autobot posts:', error);
      return new HttpException('Oops, Something went wrong', 500);
    }
  }

  async getAutobotPostComments(postId: number): Promise<any> {
    try {
      const comments = await this.prismaService.comment.findMany({
        where: { postId },
        take: this.TAKE,
      });
      if (!comments)
        return new HttpException('Comments not found for this post', 404);
      return comments;
    } catch (error) {
      this.logger.error('Error getting Autobot post comments:', error);
      return new HttpException('Oops, Something went wrong', 500);
    }
  }
}
