import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/global/globalEnum';

@Injectable()
export class RolesGuard implements CanActivate {
 constructor(private readonly reflector: Reflector) { }
 canActivate(context: ExecutionContext): boolean {
  const roles = this.reflector.get<Role[]>('roles', context.getHandler());

  if (!roles) {
   return true;
  }
  const request = context.switchToHttp().getRequest();
  const user = request.user
  return roles.some((role) => user.roles?.includes(role));

 }
}

