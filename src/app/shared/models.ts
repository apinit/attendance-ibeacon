export class Course{
    id?: string;
    name?: string;
    semester?: any;
    group?: number;
    year?: any;
    Students?: Student;
    iBeacon?: iBeacon;
}

export class Student{
    id?: any;
    name?: string;
    attendance?: Attendance;
}

export class Attendance{
    date?: Date;
    score?: number;
}

export class Schedule{
    date?: any;
}

export class iBeacon{
    id?: any;
    name?: string;
}
export class User{
    fname: string;
    lname: string;
    email: string;
    password: string;
}