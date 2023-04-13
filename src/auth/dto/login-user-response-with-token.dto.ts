export class LoginUserResponseWithTokenDto {
  token: string;
  user: {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
