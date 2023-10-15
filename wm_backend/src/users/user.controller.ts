import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userData: User): Promise<User> {
    const { username, email, password } = userData;

    const existingUser = await this.userService.findByUsername(username);
    const existingUserByEmail = await this.userService.findByEmail(email);

    if (existingUser || existingUserByEmail) {
      throw new BadRequestException(
        'El nombre de usuario o correo electrónico ya están en uso.',
      );
    }

    // Genera un valor de sal
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    // Hashea la contraseña utilizando el valor de sal
    const hashedPassword = bcrypt.hashSync(password, salt);

    const token = this.generateUniqueToken(email);
    const newUser = new this.userService.userModel({
      username,
      email,
      password: hashedPassword,
      creationDate: new Date(),
      token,
    });

    await newUser.save();

    return this.userService.createUser(newUser);
  }

  private generateUniqueToken(email: string): string {
    const uniqueToken = email + uuidv4();
    return uniqueToken;
  }

  @Post('login')
  async login(
    @Body() loginData: { email: string; password: string },
  ): Promise<{ token: string }> {
    const { email, password } = loginData;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException(
        'El correo electrónico no está registrado.',
      );
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('La contraseña es incorrecta.');
    }

    const token = this.generateUniqueToken(email);

    return { token };
  }
}
