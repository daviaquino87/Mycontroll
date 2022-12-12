import { AppdataSource } from "../database/data-source";
import { User } from "../database/entities/User";
import { ErrorPrivate } from "./ExceptionError";

export const userConnection = AppdataSource.getRepository(User);

export const checkUserData = async (cpf: string, email: string) => {
  const verifycpf = await userConnection.findOneBy({ cpf });
  const verifemail = await userConnection.findOneBy({ email });

  if (!verifycpf && !verifemail) {
    return;
  }
  throw new ErrorPrivate("The data provided is already being used!", 409);
};

export function validateCpf(cpf: string) {
  const cpfFormated = cpf.replace(/\D/g, "");

  if (cpfFormated.length < 11) {
    throw new ErrorPrivate("informed invalid cpf!", 404);
  }

  var sum;
  var Rest;
  sum = 0;
  if (cpfFormated == "00000000000") return false;

  for (var i = 1; i <= 9; i++)
    sum = sum + parseInt(cpfFormated.substring(i - 1, i)) * (11 - i);
  Rest = (sum * 10) % 11;

  if (Rest == 10 || Rest == 11) Rest = 0;
  if (Rest != parseInt(cpfFormated.substring(9, 10))) {
    throw new ErrorPrivate("informed invalid cpf!", 404);
  }

  sum = 0;
  for (i = 1; i <= 10; i++)
    sum = sum + parseInt(cpfFormated.substring(i - 1, i)) * (12 - i);
  Rest = (sum * 10) % 11;

  if (Rest == 10 || Rest == 11) Rest = 0;
  if (Rest != parseInt(cpfFormated.substring(10, 11))) {
    throw new ErrorPrivate("informed invalid cpf!", 404);
  }
  return cpfFormated;
}
