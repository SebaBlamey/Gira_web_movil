import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() loginData: {email: string; password: string}){
		return this.authService.login(loginData);
	}
	@Post('register')
	async register(@Body() userData: {email: string ,username: string, password: string}){
		return this.authService.register(userData)
	}
	@Delete(':email')
	async deleteAccount(@Param('email') userEmail: string){
		try{
			const result = await this.authService.deleteAccount(userEmail);
			return {message: 'Cuenta eliminada exitosamente'};
		} catch(error){
			return {error: 'No se pudo eliminar la cuenta'}
		}
	}
	@Post('getPassword')
	async getPassword(@Body() userData: {email:string}){
		return this.authService.getPassword(userData)
	}
	@Get('hello')
	async hello(){
		return 'test';
	}
}
