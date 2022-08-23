import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { IToken } from '../interfaces/token.interface';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class AuthService {

  constructor(private readonly authRepo: AuthRepository) {}

  async login(authDto: CreateAuthDto): Promise<IToken | null> {
    return this.authRepo.login(authDto.username, authDto.password);
  }
}
