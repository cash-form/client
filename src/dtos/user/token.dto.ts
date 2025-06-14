export default class TokenDto {
  public readonly accessToken: string = "";
  public readonly refreshToken: string = "";
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
