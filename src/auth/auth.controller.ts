import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CrendentialsDto } from './dto/credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import AuthUser from './auth-user.decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: CrendentialsDto) {
    return this.authService.login(data);
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  profile(@AuthUser() user: User): User {
    return user;
  }
}
