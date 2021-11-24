import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { UserResponse } from "../interfaces/responses/user.response"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(showToken: boolean = true): UserResponse {
    const { id, firstName, lastName, email } = this;
    const responseObject: UserResponse = {
      id,
      firstName,
      lastName,
      email,
    };

    return responseObject;
  }
}
