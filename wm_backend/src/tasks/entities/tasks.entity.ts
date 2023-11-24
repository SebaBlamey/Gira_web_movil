import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Trabajo } from 'src/proyect/entities/trabajo.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, { eager: true })
  creator: User;

  @ManyToOne(() => User, { eager: true })
  responsible: User;

  @ManyToOne(() => Trabajo, { eager: true })
  trabajo: Trabajo;

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ default: false })
  isDeleted: boolean;
}