import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from 'src/microservices/email/email.sender';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    public userModel: Model<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email: email }).exec();
  }

  async findById(userId: string): Promise<User | null> {
    return await this.userModel.findById(userId).exec();
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username: username }).exec();
  }

  async sendEmail(to:string, subject:string, body:string): Promise<void> {
    return await sendEmail(to, subject, body)
  }
}
