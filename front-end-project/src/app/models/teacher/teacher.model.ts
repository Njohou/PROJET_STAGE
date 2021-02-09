export class TeacherModel {
  id: number;
  constructor(public username: string,
              public first_name: string,
              public last_name: string,
              public password: string,
              public tel: number,
              public email: string,
              public gender: string,
              public is_active: boolean,
              public is_staff: boolean,
              public is_superuser: boolean,
              public my_admin: number
  ) {}
}
