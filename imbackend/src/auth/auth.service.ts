import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { UserLogin } from './models/userLogin';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: UserLogin): UserToken {
    const payload: UserPayload = {
      email: user._doc.email,
      name: user._doc.name,
      isAdmin: user._doc.isAdmin,
    };
    console.log(user._doc)
    const jwtToken = this.jwtService.sign(payload)
    
    return {
      access_token: jwtToken
    }
  }
  
  async validateUser(email: string, password: string):Promise <object> {
    const user = await this.userService.findByEmail(email);
      
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return { ...user, password: undefined };
      }
    }

    throw new Error('Email address or password is incorrect.');
  }
}

 