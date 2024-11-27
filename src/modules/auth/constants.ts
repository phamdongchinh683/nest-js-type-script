import { SetMetadata } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'your-secure-secret-key',
};
export const IS_PUBLIC_KEY: string = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
