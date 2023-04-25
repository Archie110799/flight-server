import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = await this.userModel.create(createUserDto);
      if (!createdUser) {
        throw new HttpException('NOT_MODIFIED', HttpStatus.NOT_MODIFIED);
      } else {
        return createdUser;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: error?.message,
        },
        HttpStatus.FORBIDDEN,
      );
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
        {
          status: HttpStatus.FORBIDDEN,
          message: 'FORBIDDEN',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    if (infoUser?.password === user.password) {
      return user;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'UNAUTHORIZED',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
