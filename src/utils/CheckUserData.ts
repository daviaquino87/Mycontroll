import { AppdataSource } from "../database/data-source";
import { User } from "../database/entities/User";

export const userConnection = AppdataSource.getRepository(User);

export const checkUserData = async (cpf: string, email: string) => {
  const verifycpf = await userConnection.findOneBy({ cpf });
  const verifemail = await userConnection.findOneBy({ email });

  if (!verifycpf && !verifemail) {
    return false;
  }
  return true;
};
