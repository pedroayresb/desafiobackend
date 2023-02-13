export interface UserCpf {
  cpf: number;
}

export interface IUser extends UserCpf {
  id?: number;
}
