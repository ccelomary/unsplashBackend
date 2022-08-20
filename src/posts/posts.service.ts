import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Post, PostDocument } from './posts.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postsModule: Model<PostDocument>,
  ) {}

  async getPosts(): Promise<Post[]> {
    const posts = await this.postsModule
      .find()
      .sort({ createdAt: -1 })
      .populate('user', '-_id -__v -password').exec();
    return posts;
  }

  async filterPosts(query: { search: string }): Promise<Post[]> {
    const posts = await this.postsModule.find({
      label: { $regex: query.search, $options: 'i' },
    });
    return posts;
  }
}
