export interface LoginResponse {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
  message: string;
}
