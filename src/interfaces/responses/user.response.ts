export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AllUsersResponse {
  [index: number]: {
    id: number;
    firstName: string;
    lastName: string;
  };
}
