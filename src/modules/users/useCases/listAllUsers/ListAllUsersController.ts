import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers as any;
    const all = this.listAllUsersUseCase.execute({ user_id });
    return response.status(200).json(all);
  }
}

export { ListAllUsersController };