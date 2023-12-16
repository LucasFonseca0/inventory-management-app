import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()

export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const createdUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
        isAdmin:false
      });
      await createdUser.save();

      return {
        ...createdUser.toObject(),
        password: undefined,
      };
    } catch (error) {
      console.error('Error during user creation:', error);
      throw error;
    }
  }
 
  findByEmail(email: string) { 
    return this.userModel.findOne({ email }).exec();
  }
}
