import {
  ForbiddenException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUserName(username);

    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    const isCreateUsers = this.configService.get('CREATE_USERS') === 'true';
    if (!isCreateUsers) {
      throw new BadRequestException('Запрещено создавать новых пользователей');
    }

    try {
      const userData = await this.usersService.create(dto);

      token: this.jwtService.sign({
        id: userData.id,
        role: userData.role.name,
      });
    } catch (err) {
      // throw new ForbiddenException('Ошибка при регистрации');
      throw new ForbiddenException(err.message);
    }
  }

  async login(user: UserEntity) {
    return {
      token: this.jwtService.sign({ id: user.id, role: user.role.name }), // содержание роли (передаеться рроль в зависимости от кого регестрируюсь)
    };
  }
}
