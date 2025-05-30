import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { LoginDto, SignupDto } from 'src/dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwt: JwtService,
  ) {}

  async getMe(user: any) {
    try {
      const userId = user.sub;
      return this.databaseService.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
        },
      });
    } catch (error) {
      throw new ForbiddenException('User not found');
    }
  }

  async signup(signupDto: SignupDto) {
    try {
      const hashed = await bcrypt.hash(signupDto.password, 10);
      const user = await this.databaseService.user.create({
        data: {
          name: signupDto.name,
          username: signupDto.username,
          email: signupDto.email,
          password: hashed,
        },
      });

      return this.signToken(user.id, user.username);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email or username already exists');
      }
      throw new ForbiddenException('Signup failed');
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { email: loginDto.email },
      });

      if (!user) {
        throw new ForbiddenException('User not found');
      }

      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new ForbiddenException('Invalid password');
      }

      return this.signToken(user.id, user.email);
    } catch (error) {
      throw new ForbiddenException('Login failed');
    }
  }

  private signToken(userId: number, email: string) {
    const payload = { sub: userId, email };
    const token = this.jwt.sign(payload, { expiresIn: '7d' });

    return token;
  }
}
