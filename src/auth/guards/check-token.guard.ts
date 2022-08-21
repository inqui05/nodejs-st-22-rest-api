import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class CheckTokenGuard implements CanActivate {

  constructor(private JwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];

      this.JwtService.verify(token);
      return true;
    } catch (err) {
      if (err instanceof TypeError) {
        throw new UnauthorizedException();
      }

      throw new ForbiddenException();
    }
  }
}
