export class User {
  constructor(
    public userId: string,
    public userName: string,
    public title: string,
    public roles: string[],
    public email: string,
    public password: string
  ) {}
}
