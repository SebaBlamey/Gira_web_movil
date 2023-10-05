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

	async login (loginData: {username: string; password: string}){
		const user = await this.userRepository.findOne({
			where: {username: loginData.username, password: loginData.password },
		});

		if(!user){
			throw new Error('Credenciales incorrectas')
		}
		return user;
	}
}
