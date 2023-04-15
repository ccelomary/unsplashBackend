import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/posts/posts.schema';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  async findOne(username: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec();
    return user;
  }

  async getUser(username: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    return {
      username: user.username,
      picture: user.picture,
    };
  }

  async createUser(user: {
    username: string;
    password: string;
  }): Promise<{ status: number; message: string }> {
    const hashedPassword = await bcrypt.hash(
      user.password,
      parseInt(process.env.SALT_ROUNDS),
    );
    try {
      const newUser = new this.userModel({
        username: user.username,
        password: hashedPassword,
      });
      await newUser.save();
      return {
        status: 201,
        message: 'User created',
      };
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Username already exists',
      };
    }
  }

  async upadateUserImage(user: {
    username: string;
    imageData: string;
  }): Promise<{ status: number; message: string }> {
    await this.userModel.findOneAndUpdate(
      { username: user.username },
      { picture: user.imageData },
    );
    return {
      status: 201,
      message: 'User image updated',
    };
  }

  async getUserPosts(username: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    const posts = await user.populate('posts');
    return posts.posts.reverse();
  }
  async createPost(
    post: {
      label: string;
      url: string;
    },
    username: string,
  ): Promise<{ status: number; message: string; post: any }> {
    const newPost = new this.postModel({
      label: post.label,
      url: post.url,
      createdAt: Date.now(),
    });
    const user = await this.userModel.findOne({ username });
    newPost.user = user._id;
    await newPost.save();
    user.posts.push(newPost);
    await user.save();
    return {
      status: 201,
      message: 'Post created',
      post: newPost,
    };
  }

  async deletePost(username: string, postId: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    const post = await this.postModel.findById(postId);
    user.update({ $pull: { posts: post._id } });
    await user.save();
    await post.remove();
    return {
      status: 201,
      message: 'Post deleted',
    };
  }
}
