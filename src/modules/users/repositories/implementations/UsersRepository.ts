import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

import { v4 as uuidV4 } from "uuid";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const userExists = this.findByEmail(email);
    if (userExists) {
      throw new Error("User already exists");
    }
    const newUser: User = {
      admin: false,
      email,
      name,
      id: uuidV4(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  turnAdmin(receivedUser: User): User {
    this.users.map((user) => {
      if (user.id === receivedUser.id) {
        user.admin = true;
        user.updated_at = new Date();
      }
    });
    return this.findById(receivedUser.id);
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };