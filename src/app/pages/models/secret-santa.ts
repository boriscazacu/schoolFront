export class SecretSanta{

    id: number;
    name: string;
    password: string;
    isUsed: boolean;
    selected: boolean;

    constructor(id: number, name: string, password: string){
        this.id = id;
        this.name = name;
        this.password = password;
    }
}
