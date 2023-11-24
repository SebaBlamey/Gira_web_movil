import {
  Controller,
  Post,
  Patch,
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
import { get } from 'http';
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
    const user = await this.userService.findByIdd(userId);

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

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() changeParams: { newUsername:string},
  ) {
    console.log(changeParams);
    const user = await this.userService.findById2(id);
    
    user.username = changeParams.newUsername;
    await user.save();
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
  @Get('findById/:id') // Utiliza :id para indicar que es un parámetro en la URL
  async getUser(@Param('id') _id: string) {
    console.log(`Buscando usuario con ID: ${_id}`);
    return this.userService.findByIdd(_id);
    //console.log(`Buscando usuario con email: ${_id}`)
    //return this.userService.findByEmail(_id);
  }
  @Get('findByEmail/:email')
  async getUserByEmail(@Param('email') _email: string){
    console.log(`Buscando usuario con email: ${_email}`)
    return this.userService.findByEmail(_email);
  }

  @Post('deleteEquipoFromUser')
  async deleteEquipoFromUser(@Body() { userId, equipoId }: { userId: string, equipoId: string }) {
    return this.userService.deleteEquipoFromUser(userId, equipoId);
  }

  @Get('findUserByEquipoId/:equipoId')
  async findUsersByEquipoId(@Param('equipoId') equipoId: string){
    return this.userService.findUsersByEquipoId(equipoId);
  }

//usar get profile
}
 