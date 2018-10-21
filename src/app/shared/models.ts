export class Course{
    id?: string;
    name?: string;
    semester?: any;
    group?: number;
    year?: any;
    Students?: Student;
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