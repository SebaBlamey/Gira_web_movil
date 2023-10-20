import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tarea } from './tareas.entity';

@Entity()
export class Tablero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  ownerId: string; // Almacena el ID del usuario dueño del tablero

  @OneToMany(() => Tarea, (tarea) => tarea.tablero)
  tareas: Tarea[];
}
