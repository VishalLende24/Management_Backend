export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
}
