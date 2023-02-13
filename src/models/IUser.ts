export interface UserCpf {
  cpf: string;
}

export interface IUser extends UserCpf {
  id?: number;
}
