export class NotificationPostModel {
  constructor(
    public message: string,
    public is_checked: boolean,
    public teacher: number,
    public classe: number
  ) {}
}
