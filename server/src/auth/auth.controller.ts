import { Controller, Request, Post, UseGuards, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UsePipes(new ValidationPipe())
  @Post('signup')
  async addUser(@Body() createUserDto: CreateUserDto,) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
    await this.usersService.registerUser(
      createUserDto.username,
      hashedPassword,
    );
    return {
      msg: 'User successfully registered',
    };
  }
}