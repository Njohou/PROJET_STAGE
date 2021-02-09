export class StudentModel {
  id: number;
  // public my_admin: number,
  constructor(public username: string,
              public regis_number: string,
              public first_name: string,
              public last_name: string,
              public password: string,
              public tel: number,
              public dateOfBirth: string,
              public gender: string,
              public is_active: boolean,
              public is_staff: boolean,
              public is_superuser: boolean,
              public my_class: number,
              public my_admin: number,
              public courses: number[]
              ) {}
}
