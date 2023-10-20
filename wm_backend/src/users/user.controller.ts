import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  BadRequestException,
  ConflictException,
  Param,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
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
      throw new ConflictException(
        'El nombre de usuario o correo electrónico ya están en uso.',
      );
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

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
  ): Promise<{ user }> {

    const { email, password } = loginData;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new ConflictException('El correo o la contrasena son incorrectos.');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new ConflictException('El correo o la contrasena son incorrectos.');
    }

    const token = this.generateUniqueToken(email);

    return { user };
  }

  @Post('recoverPass')
async recoverPass(@Body() recoverData: { email: string }): Promise<{ user }> {
  const { email } = recoverData;

  const user = await this.userService.findByEmail(email);
  if (!user) {
    throw new ConflictException('El correo no existe.');
  }

  const recoveryCode = this.generateRecoveryCode(6);
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 5);

  user.recoveryCode = recoveryCode;
  user.recoveryCodeExpiration = expirationTime;
  await user.save();

  await this.userService.sendEmail(
    user.email,
    'Recuperacion',
    `Su código de recuperación es: ${recoveryCode}\nExpira en 5 minutos.`,
  );
  return { user };
}


  private generateRecoveryCode(length): string {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  }

  @Post('changePass/:userId')
  async changePass(
    @Param('userId') userId: string,
    @Body() changePassData: { currentPassword: string; newPassword: string },
  ): Promise<{ message: string }> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    console.log(user);
    console.log(`currentPassword: ${changePassData.currentPassword}\nnewPassword: ${changePassData.newPassword}`)
    const {newPassword } = changePassData;


    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return { message: `Contraseña actualizada con éxito,\n${user.password}` };
  }

  @Post('updateUser/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() changeParams: {currentUsername:string; newUsername:string; currentEmail:string; newEmail:string; currentPassword:string; newPassword:string},
  ) {
      const user = await this.userService.findById(userId);
      console.log(user)
     
  }
  @Get('all')
  async getAllUsers() {
    return this.userService.findAllUsers();
  }
  @Get(':userId/equipos')
  async getUserTeams(@Param('userId') userId: string){
    return this.userService.findUserTeams(userId);
  }
}
 