import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { configAppModule } from './configs/config.module';
import { JwtAppModule } from './configs/jwt.config';
import { typeOrmConfig } from './configs/typeorm.config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AdminController } from './modules/admin/admin.controller';
import { AuthController } from './modules/auth/auth.controller';
import { UsersController } from './modules/users/users.controller';
import { UsersModule } from './modules/users/users.module';
import { providers } from './providers/app.provider';
dotenv.config({ debug: false });
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig()),
    // GraphQLConfigModule,
    configAppModule,
    JwtAppModule,
    UsersModule,
  ],
  controllers: [UsersController, AuthController, AdminController],
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
