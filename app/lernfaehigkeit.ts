import {IVerbesserung} from 'services/midgard-api.ts';
import {Faehigkeit} from 'faehigkeit.ts';
import {Stufe} from 'stufe.ts';

export class Lernfaehigkeit {
    public faktor:number;
    public aktuell:number;
    public name:string;
    public gelernt:boolean;
    public faehigkeit:IVerbesserung;
    public geplanteStufen:Array<Stufe>;
    public offeneStufen:Array<Stufe>;

    constructor(neueFaehigkeit:IVerbesserung, kuerzel:string, aktuellerErfolgswert?:number) {
        if(neueFaehigkeit) {
            let pos:number;
            this.name = neueFaehigkeit.name;
            this.aktuell = null;
            this.faktor = neueFaehigkeit.berechneFaktor(kuerzel);
            this.faehigkeit = neueFaehigkeit;
            this.geplanteStufen = [];
            this.offeneStufen = [];

            if (!aktuellerErfolgswert) {
                this.gelernt = false;
                this.offeneStufen = neueFaehigkeit.verbesserungen.slice();
            } else {
                this.gelernt = true;
                pos = neueFaehigkeit.verbesserungen.findIndex((stufe)=> {
                    return stufe.erfolgswert === aktuellerErfolgswert;
                });
                this.offeneStufen = neueFaehigkeit.verbesserungen.slice(pos);
            }
        }
    }

    public static deserialize(input:any):Lernfaehigkeit {
        let result:Lernfaehigkeit = new Lernfaehigkeit(null, null, null);

        result.name = input.name;
        result.aktuell = input.aktuell;
        result.faktor = input.faktor;
        result.faehigkeit = Faehigkeit.deserialize(input.faehigkeit);
        result.geplanteStufen = input.geplanteStufen.map((stufeIn)=> {
            return new Stufe(stufeIn.erfolgswert, stufeIn.kosten);
        });
        result.offeneStufen = input.offeneStufen.map((stufeIn)=> {
            return new Stufe(stufeIn.erfolgswert, stufeIn.kosten);
        });
        return result;
    }

    berechneGeplanteKosten():number {
        let result:number;
        let erstkosten:number;

        erstkosten = this.gelernt ? 0 : this.faehigkeit.erstkosten;

        result = this.geplanteStufen.reduce((prev, curr)=> {
            return prev += curr.kosten;
        }, 0);

        return (result + erstkosten) * this.faktor;
    }

    berechneKosten(stufeCheck:Stufe):number {
        let pos;
        let result;

        pos = this.offeneStufen.findIndex((stufe)=> {
            return stufe.erfolgswert === stufeCheck.erfolgswert
        });

        if (pos === -1) {
            return 0;
        }

        result = this.offeneStufen.reduce((prev, curr, index)=> {
            if (index <= pos) {
                return prev += curr.kosten;
            }
            return prev;
        }, 0);

        return result * this.faktor;
    }

    entferneBis(stufeCheck:Stufe) {
        let stufePos:number;
        let stufen:Array<Stufe>;

        stufePos = this.geplanteStufen.findIndex((stufe)=> {
            return stufe.erfolgswert === stufeCheck.erfolgswert;
        });

        if (stufePos == -1) {
            return;
        }

        stufen = this.geplanteStufen.splice(stufePos);
        this.offeneStufen = stufen.concat(this.offeneStufen);
    }

    lerneBis(stufeCheck:Stufe) {
        let stufePos:number;
        let stufen:Array<Stufe>;

        stufePos = this.offeneStufen.findIndex((stufe)=> {
            return stufe.erfolgswert === stufeCheck.erfolgswert;
        });

        if (stufePos == -1) {
            return;
        }

        stufen = this.offeneStufen.splice(0, stufePos + 1);
        this.geplanteStufen = this.geplanteStufen.concat(stufen);
    }
}
