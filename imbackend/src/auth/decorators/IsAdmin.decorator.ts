import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export const IsAdmin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): boolean => {
    const request = ctx.switchToHttp().getRequest();
    const user: User = request.user; 

    if (!user || !user.isAdmin) {
      throw new Error('User is not an admin');
    }

    return true;
  }, 
);
  