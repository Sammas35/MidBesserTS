import {IWaffe, IWaffengrundkenntnis, IVerbesserung} from 'services/midgard-api.ts'
import {Stufe} from 'stufe.ts'

export class Waffe implements IWaffe, IVerbesserung {
    name:string;
    erstkosten:number;
    staerke:number;
    geschicklichkeit:number;
    schwierigkeit:number;
    waffengrundkenntnis:IWaffengrundkenntnis;
    verbesserungen:Array<Stufe>;

    private static stufenAngriff = [
        new Stufe(5, 6),
        new Stufe(6, 6),
        new Stufe(7, 6),
        new Stufe(8, 10),
        new Stufe(9, 20),
        new Stufe(10, 40),
        new Stufe(11, 80),
        new Stufe(12, 160),
        new Stufe(13, 300),
        new Stufe(14, 500),
        new Stufe(15, 1000),
        new Stufe(16, 1000),
        new Stufe(17, 1500),
        new Stufe(18, 1500),
        new Stufe(19, 2500)
    ];

    private static stufenAbwehr = [
        new Stufe(2, 20),
        new Stufe(3, 100),
        new Stufe(4, 400),
        new Stufe(5, 1000),
        new Stufe(6, 2000),
        new Stufe(7, 4000),
        new Stufe(8, 6000),
    ];

    private grund:Array<string> = [
        "Kr",
        "Sö"
    ];
    private standard:Array<string> = [
        "As",
        "Ba",
        "BN",
        "BS",
        "BW",
        "Gl",
        "Hä",
        "Or",
        "Se",
        "Sp",
        "Wa",
    ];
    private ausnahme:Array<string> = [
        "Be",
        "Dr",
        "Hl",
        "Hx",
        "Ma",
        "PH",
        "PF",
        "PK",
        "PM",
        "PT",
        "PW",
        "Sc",
        "Th",
    ];

    public static deserialize(waffe:IWaffe, waffengrundkenntnis:IWaffengrundkenntnis):Waffe {
        let result:Waffe;

        result = new Waffe();

        result.name = waffe.name;
        result.erstkosten = 0;
        result.staerke = waffe.staerke;
        result.geschicklichkeit = waffe.geschicklichkeit;
        result.schwierigkeit = waffe.schwierigkeit;
        result.waffengrundkenntnis = waffengrundkenntnis;
        result.verbesserungen = this.berechneStufenAngriff(waffe.schwierigkeit);
        return result;
    }

    private static berechneStufenAngriff(schwierigkeit:Number):Array<Stufe> {
        let result = [];

        Waffe.stufenAngriff.forEach((basisStufe)=>{
            result.push(new Stufe(basisStufe.erfolgswert, basisStufe.kosten * schwierigkeit));
        });

        return result;
    }

    berechneFaktor(kuerzel:string):number {
        if (this.grund.includes(kuerzel)) {
            return 0.5;
        }
        if (this.ausnahme && this.ausnahme.includes(kuerzel)) {
            return 2.0;
        }
        return 1.0;
    }
}
