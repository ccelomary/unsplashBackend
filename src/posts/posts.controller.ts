import { Controller, Get, Query } from '@nestjs/common';
import { Post } from './posts.schema';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(readonly postService: PostsService) {}

  @Get('/all')
  getAllPosts(): Promise<Post[]> {
    return this.postService.getPosts();
  }

  @Get('/filter')
  getFilteredPosts(@Query() query): Promise<Post[]> {
    return this.postService.filterPosts(query);
  }
}
