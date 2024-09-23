import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { verify } from 'argon2';
import { Types } from 'mongoose';
import { Response } from 'express';

@Injectable()
export class AuthService {
  EXPIRES_DAY_REFRESH_TOKEN = 1;
  REFRESH_TOKEN_NAME = 'refreshToken';

  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}
  async login(authDto: AuthDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.validateUser(authDto);
    const tokens = this.issueTokens(user._id);

    return {
      user,
      ...tokens,
    };
  }

  async register(authDto: AuthDto) {
    const isUserExists = await this.userService.getByEmail(authDto.email);
    if (isUserExists) {
      throw new BadRequestException('User already exists');
    }
    const createdUser = await this.userService.create(authDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = createdUser.toObject();

    const tokens = this.issueTokens(user._id);

    return {
      user,
      ...tokens,
    };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwtService.verifyAsync(refreshToken);

    if (!result) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.getById(result.id);

    const tokens = this.issueTokens(user._id);

    return {
      user,
      ...tokens,
    };
  }

  private issueTokens(userId: string | Types.ObjectId) {
    const data = { id: userId };

    const accessToken = this.jwtService.sign(data, { expiresIn: '2h' });
    const refreshToken = this.jwtService.sign(data, { expiresIn: '5d' });

    return { accessToken, refreshToken };
  }

  private async validateUser(authDto: AuthDto) {
    const user = await this.userService.getByEmail(authDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValid = await verify(user.password, authDto.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRES_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: 'localhost',
      expires: expiresIn,
      secure: true,
      sameSite: 'none',
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: 'localhost',
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
  }
}
