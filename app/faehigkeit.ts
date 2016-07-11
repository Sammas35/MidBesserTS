import {IVerbesserung} from 'services/midgard-api.ts'
import {Stufe} from 'stufe.ts'

export class Faehigkeit implements IVerbesserung{
    name:string;
    erstkosten:number;
    grund:Array<string>;
    ausnahme:Array<string>;
    verbesserungen:Array<Stufe>;

    public static deserialize(faehigkeit:IVerbesserung) : Faehigkeit{
        let result:Faehigkeit;

        result = new Faehigkeit();

        result.name = faehigkeit.name;
        result.erstkosten = faehigkeit.erstkosten;
        result.grund =  faehigkeit.grund ? faehigkeit.grund.slice() : [];
        result.ausnahme = faehigkeit.ausnahme ? faehigkeit.ausnahme.slice() :[];
        result.verbesserungen = faehigkeit.verbesserungen ? faehigkeit.verbesserungen.slice():[];

        return result;
    }

    berechneFaktor(kuerzel:string):number {
        if(this.grund && this.grund.includes(kuerzel)){
            return 0.5;
        }
        if(this.ausnahme && this.ausnahme.includes(kuerzel)){
            return 2.0;
        }
        return 1.0;
    }
}
