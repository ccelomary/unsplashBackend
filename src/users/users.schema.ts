import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Post } from '../posts/posts.schema';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
    minlength: 7,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;
  @Prop({
    default: null,
  })
  picture: string;
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ])
  posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);
