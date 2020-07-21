import { Grup } from './grup';

export class Student {

    id: number;
    firstName: string;
    lastName: string;
    sex: string;
    idGr: number;

constructor(id: number,firstName:string, lastName: string, sex: string, idGr: number){
    this.id =id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.sex = sex;
    this.idGr = idGr;
}
}