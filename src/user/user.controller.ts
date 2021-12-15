import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import AuthUser from 'src/auth/auth-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Criar um usuário',
  })
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard())
  @Patch('update')
  @ApiOperation({
    summary: 'Atualizar o usuário autenticado',
  })
  update(@AuthUser() user: User, @Body() data: UpdateUserDto): Promise<User> {
    return this.service.update(user, data);
  }

  @UseGuards(AuthGuard())
  @Delete('delete')
  @ApiOperation({
    summary: 'Deletar o usuário autenticado',
  })
  delete(@AuthUser() user: User): Promise<{ message: string }> {
    return this.service.delete(user);
  }

  @UseGuards(AuthGuard())
  @Patch('addList/:id')
  @ApiOperation({
    summary:
      'Adicionar uma planta na lista de plantas cultivadas pelo usuário autenticado',
  })
  addList(@AuthUser() user: User, @Param('id') plantId: string): Promise<any> {
    return this.service.addList(user, plantId);
  }
}
