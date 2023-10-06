import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	){}

	async login (loginData: {email: string; password: string}){
		if(loginData.email == "" || loginData.password == ""){
			throw new Error('Campos vacios')
		}
		const user = await this.userRepository.findOne({
			where: {email: loginData.email, password: loginData.password },
		});

		if(!user){
			throw new Error('Credenciales incorrectas')
		}
		return user;
	}
	async register (userData: {email: string,username: string, password: string}){
		if(userData.email == "" || userData.username == "" || userData.password == ""){
			throw new Error('Campos vacios')
		}
		const existingUser = await this.userRepository.findOne({
			where: {email: userData.email}
		});
		if(existingUser){
			throw new Error('Usuario ya registrado')
		}
		const newUser = this.userRepository.create(userData)
		await this.userRepository.save(newUser)
		return newUser;
	}
	async deleteAccount(userEmail: string){
		const user = await this.userRepository.findOne({
			where: {email: userEmail}
		});
		if(!user){
			throw new Error('Usuario no encontrado');
		}
		await this.userRepository.remove(user)
		return true;
	}
	async getPassword(userData: {email: string}){
		if(userData.email == ""){
			throw new Error('Campos vacios')
		}
		const existingUser = await this.userRepository.findOne({
			where: {email: userData.email}
		});
		if(existingUser){
			return existingUser.password;
		}else{
			throw new Error('Usuario no registrado')
		}
	}
}
