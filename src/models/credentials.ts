export interface CredentialsModel {
  username: string;
  password: string;
  device: string;
  deviceToken: string;
}

export interface ChangePasswordModel {
  token: string;
  currentPassword: string;
  newPassword: string;
}
