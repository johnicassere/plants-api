import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
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
  @Get('findMany')
  @ApiOperation({
    summary: 'Listar todos os usuários',
  })
  findMany(): Promise<any[]> {
    return this.service.findMany();
  }

  @UseGuards(AuthGuard())
  @Get('findUnique/:id')
  @ApiOperation({
    summary: 'Listar um usuário pelo ID',
  })
  findUnique(@Param('id') id: string): Promise<User> {
    return this.service.findUnique(id);
  }

  @UseGuards(AuthGuard())
  @Patch('update/:id')
  @ApiOperation({
    summary: 'Atualizar um usuário pelo ID',
  })
  update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
    return this.service.update(id, data);
  }

  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Deletar um usuário pelo ID',
  })
  delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.delete(id);
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
