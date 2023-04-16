import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) {}
  @Post('/create')
  create(@Body() user: { username: string; password: string }): Promise<{
    status: number;
    message: string;
  }> {
    return this.usersService.createUser(user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/posts')
  findAllPosts(@Request() req): Promise<any> {
    return this.usersService.getUserPosts(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  findOne(@Request() req): Promise<any> {
    return this.usersService.getUser(req.user.username);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/update_picture')
  updatePicture(
    @Body() data: { imageData: string },
    @Request() req,
  ): Promise<{ status: number; message: string }> {
    return this.usersService.upadateUserImage({
      username: req.user.username,
      imageData: data.imageData,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Post('/posts/add')
  addPost(
    @Request() req,
    @Body()
    post: {
      label: string;
      url: string;
    },
  ): Promise<{ status: number; message: string; post: any }> {
    return this.usersService.createPost(post, req.user.username);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/posts/:id/delete')
  deletePost(
    @Request() req,
    @Param('id') id: string,
  ): Promise<{ status: number; message: string }> {
    return this.usersService.deletePost(req.user.username, id);
  }
}
