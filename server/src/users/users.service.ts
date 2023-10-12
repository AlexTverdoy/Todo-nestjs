import { Injectable, NotAcceptableException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(username: string) {
    return await this.userModel.findOne({ username }).exec();
  }

  async registerUser(username: string, password: string) {
    const user = await this.findOne(username);
    if (user) {
      throw new ConflictException(`username:${username} is existed`)
    }
    const newUser = new this.userModel({
      username,
      password,
    });
    await newUser.save();
    return newUser;
  }

  async validateUser(username: string, password: string) {
    const user = await this.findOne(username);
    if (!user) {
      throw new NotAcceptableException(['could not find the user']);
    }

    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      throw new NotAcceptableException(['password is invalid']);
    }

    return {
      userId: user.id,
      username: user.username
    };
  }
}
