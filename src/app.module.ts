import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { configAppModule } from './configs/config.module';
import { GraphQLConfigModule } from './configs/graphql.config';
import { JwtAppModule } from './configs/jwt.config';
import { typeOrmConfig } from './configs/typeorm.config';
import { controllersApp } from './controllers/app.comtroller';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { PostModule } from './modules/post/post.module';
import { UsersModule } from './modules/user/user.module';
import { providersApp } from './providers/app.provider';
dotenv.config({ debug: false });
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig()),
    GraphQLConfigModule,
    configAppModule,
    JwtAppModule,
    UsersModule,
    PostModule,
  ],
  controllers: [...controllersApp],
  providers: [...providersApp],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) { }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
