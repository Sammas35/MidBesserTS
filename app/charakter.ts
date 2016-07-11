import {ICharakter} from 'services/player-api.ts'
import {IVerbesserung, IWaffe} from 'services/midgard-api.ts'
import {Lernfaehigkeit} from 'lernfaehigkeit.ts'

export class Charakter implements ICharakter {
    name:string;
    abenteurerTyp:string;
    abenteurerTypKuerzel:string;
    grad:number;
    staerke:number;
    geschicklichkeit:number;
    konstitution:number;
    intelligenz:number;
    zaubertalent:number;
    faehigkeiten:Array<IVerbesserung>;
    waffen:Array<IWaffe>;
    lernen:Array<Lernfaehigkeit>;

    addToLernListe(lernfaehigkeit:Lernfaehigkeit) {
        console.log('lerne ' + lernfaehigkeit.name);
        this.lernen.push(lernfaehigkeit);
    }

    entferneLernfaehigkeit(lernfaehigkeit:Lernfaehigkeit){
        //this.lernen.findIndex()
    }


    public static deserialize(charakter:ICharakter):Charakter {
        var result:Charakter;

        result = new Charakter();

        result.name = charakter.name;
        result.abenteurerTyp = charakter.abenteurerTyp;
        result.abenteurerTypKuerzel = charakter.abenteurerTypKuerzel;
        result.grad = charakter.grad;
        result.staerke = charakter.staerke;
        result.geschicklichkeit = charakter.geschicklichkeit;
        result.konstitution = charakter.konstitution;
        result.intelligenz = charakter.intelligenz;
        result.zaubertalent = charakter.zaubertalent;
        result.faehigkeiten = charakter.faehigkeiten ? charakter.faehigkeiten.slice() : [];
        result.lernen = charakter.lernen ? charakter.lernen.slice() : [];

        return result;
    }
}
