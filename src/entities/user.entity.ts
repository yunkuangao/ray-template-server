import { compare, hash } from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BCRYPT_SALT_ROUNDS } from '#app/app.constant';
import { Base } from '#entities/base.entity';
import { Todo } from '#entities/todo.entity';

export enum Role {
  User = 'User',
  Admin = 'Admin',
}

export enum UserStatus {
  ApprovePending = 'APPROVE_PENDING',
  Approved = 'APPROVED',
  Banned = 'BANNED',
}

@Entity()
export class User extends Base {
  @PrimaryGeneratedColumn('uuid')
  readonly uuid!: string;

  @Column()
  readonly status!: UserStatus;

  @Column()
  readonly role!: Role;

  @Column({ unique: true })
  readonly email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Todo, ({ user }) => user)
  readonly todos!: Todo[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, BCRYPT_SALT_ROUNDS);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return compare(attempt, this.password);
  }
}
