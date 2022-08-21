import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { IToken } from '../interfaces/token.interface';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() authDto: CreateAuthDto): Promise<IToken | null> {
    const result = await this.authService.login(authDto);
    if (!result) {
      throw new UnauthorizedException('Login or password is uncorrect');
    }
    return result;
  }
}
