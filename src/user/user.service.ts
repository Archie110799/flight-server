import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './user.dto';
import HttpException from 'src/common/exception/http-exception';
import { HttpConstants, Message } from 'src/common/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    if (!createdUser) {
      throw new HttpException(404, Message.error[404]);
    }else{
      return createdUser;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }

  async login(infoUser: ILogin): Promise<User> {
    const user = await this.userModel
      .findOne({ name: new RegExp('^' + infoUser?.name + '$', 'i') })
      .exec();
    if (!user) {
      throw new HttpException(
        HttpConstants.HTTP_STATUS_NOT_FOUND,
        Message.error[404],
      );
    }

    if (infoUser?.password === user.password) {
      return user;
    } else {
      throw new HttpException(
        HttpConstants.HTTP_STATUS_UNAUTHORIZED,
        Message.error.PASSWORD_NOT_MATCHED,
      );
    }
  }
}
