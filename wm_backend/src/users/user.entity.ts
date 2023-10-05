import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserEntity{
	@Column({primary: true})
	email: string;
	@Column()
	username: string;
	@Column()
	password: string;
}
