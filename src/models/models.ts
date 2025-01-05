export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  personType: string;
}
export interface RegisterResponse {
  user: {
    _id: string;
    fullName: string;
    email: string;
    personType: string;
  };
  token: string;
}
