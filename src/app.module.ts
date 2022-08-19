import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { dbConfig } from './common/Constants';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    MongooseModule.forRoot(
      `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.cluster}.tlcopwh.mongodb.net/${dbConfig.database}?retryWrites=true&w=majority`,
    ),
  ],
})
export class AppModule {}
