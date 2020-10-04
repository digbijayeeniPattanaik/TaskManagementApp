export interface IRegister {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address1: string;
  address2: string;
  address3: string;
  postcode: string;
  country: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  displayName: string;
  token: string;
}
