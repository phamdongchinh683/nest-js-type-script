import { JwtModule } from '@nestjs/jwt';
import { jwtConstants, tokenLife } from 'src/common/utils/constants';
export const JwtAppModule = JwtModule.register({
  global: true,
  secret: jwtConstants.secret,
  signOptions: { expiresIn: tokenLife },
});
