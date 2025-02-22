export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export interface UserCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends UserCredentials {
    name: string;
  }