export interface AuthLoginRequest {
  username: string;
  password: string;
}

export interface AuthUserProfile {
  username: string;
  name: string;
  surname: string;
  email: string;
  country: string;
}

export interface AuthState {
  user: AuthUserProfile | null,
  favorite: string[]
}