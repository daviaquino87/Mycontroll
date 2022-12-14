import { Request, Response } from "express";
import { ErrorPrivate } from "../../../utils/ExceptionError";
import { ListMontantService } from "./ListMontantService";

export class ListMontantController {
  async list(request: Request, response: Response) {
    const user_id = request.user.id;

    if (!user_id) {
      throw new ErrorPrivate("Not found!", 404);
    }

    const listMontant = new ListMontantService();
    const data = await listMontant.list(user_id);

    return response.json({ montant: Number(data.toFixed(2)) });
  }
}
