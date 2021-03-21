export class Results{

    id: number;
    secretSanta: string;
    participant: string;

    constructor(id: number, secretSanta: string, participant: string){
        this.id = id;
        this.secretSanta = secretSanta;
        this.participant = participant;
    }
}
