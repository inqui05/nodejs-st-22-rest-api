import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { User } from 'src/user/models/user.model';
import { IToken } from '../interfaces/token.interface';

@Injectable()
export class AuthRepository {

  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService
  ) {}

  async login(login: string, password: string): Promise<IToken | null> {
    const user = await this.userModel.findOne({ where: { [Op.and]: [
      { login }, { isDeleted: false }
    ] }});

    if (user && user.password === password) {
      const payload = { id: user.id, login: user.login };
      return { token: this.jwtService.sign(payload) };
    }

    return null;
  }
}
