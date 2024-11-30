import { ConfigModule } from '@nestjs/config';
export const configAppModule = ConfigModule.forRoot({
  envFilePath: '.development.env',
  isGlobal: true,
  ignoreEnvFile: true,
  ignoreEnvVars: true,
});
