import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('create')
  createUser(@Body() data: CreateUserDto) {
    return this.service.createUser(data);
  }
}
