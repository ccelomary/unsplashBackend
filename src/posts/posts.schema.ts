import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../users/users.schema';
export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({
    required: true,
  })
  label: string;
  @Prop({
    required: true,
  })
  url: string;
  @Prop({
    default: null,
  })
  user: User[];
  @Prop({
    createdAt: 'createdAt',
  })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
