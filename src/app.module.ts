import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { configAppModule } from './configs/config.module';
import { GraphQLConfigModule } from './configs/graphql.config';
import { JwtAppModule } from './configs/jwt.config';
import { typeOrmConfig } from './configs/typeorm.config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AdminController } from './modules/admin/admin.controller';
import { AuthController } from './modules/auth/auth.controller';
import { PetController } from './modules/pet/pet.controller';
import { PetModule } from './modules/pet/pet.module';
import { PostController } from './modules/post/post.controller';
import { PostModule } from './modules/post/post.module';
import { UsersController } from './modules/users/users.controller';
import { UsersModule } from './modules/users/users.module';
import { providers } from './providers/app.provider';
dotenv.config({ debug: false });
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig()),
    GraphQLConfigModule,
    configAppModule,
    JwtAppModule,
    UsersModule,
    PetModule,
    PostModule,
  ],
  controllers: [UsersController, AuthController, PetController, PostController, AdminController],
  providers: [
    ...providers
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) { }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UsersController);
  }
}
