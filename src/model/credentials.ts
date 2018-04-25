export class CredentialsModel {
  username: string;
  password: string;
  device: string;
  deviceToken: string;
}

export class ChangePasswordModel {
  token: string;
  currentPassword: string;
  newPassword: string;
}
