import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, UsersModule, PostsModule, AuthModule, ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
  })],
})
export class AppModule {}
