import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const userExist = this.usersRepository.findByEmail(email)

    if(userExist){
      throw new Error('user already exist')
    }

    const userCreated = this.usersRepository.create({ name, email });
    return userCreated;
  }
}

export { CreateUserUseCase };
