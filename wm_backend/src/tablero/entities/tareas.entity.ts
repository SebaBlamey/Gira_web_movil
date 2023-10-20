import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tablero } from './tablero.entity';

@Entity()
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  userId: string;

  @ManyToOne(() => Tablero, (tablero) => tablero.tareas)
  tablero: Tablero;

}
