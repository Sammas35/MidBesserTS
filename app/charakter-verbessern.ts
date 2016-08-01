import * as angular from 'angular'


import {Faehigkeit} from 'faehigkeit.ts'
import {Waffe} from 'waffe.ts'
import {Lernfaehigkeit} from 'lernfaehigkeit.ts'
import {Stufe} from 'stufe.ts'
import playerApiModule, {IPlayerApi, IPlayerData, ICharakter} from 'services/player-api.ts'
import midgardApiModule, {IMidgardApi, IVerbesserung, IWaffengrundkenntnis, IWaffe} from 'services/midgard-api.ts'

interface IVerbessernParams extends ng.route.IRouteParamsService {
    charakter: string;
}

class CharakterVerbessern {
    private playerData:IPlayerData;
    private charakter:ICharakter;
    private faehigkeiten:Array<IVerbesserung>;
    private offeneFaehigkeiten:Array<IVerbesserung>;
    private waffengrundkenntnisse:Array<IWaffengrundkenntnis>;
    private waffen:Array<IWaffe>;
    private offeneWaffen:Array<IWaffe>;

    constructor(private playerApi:IPlayerApi, private midgardApi:IMidgardApi, private $routeParams:IVerbessernParams, private $http:angular.IHttpService) {
        this.playerData = playerApi.getPlayerData();
        console.log('CharakterVerbessern playerData', this.playerData, $routeParams.charakter);
        this.charakter = this.getCharakterByName($routeParams.charakter);

        console.log("geladener Charakter", this.charakter);
        this.loadFaehigkeiten();
        this.loadWaffen();
    }

    public lerneFaehigkeit(faehigkeit:IVerbesserung) {
        let pos:number = this.offeneFaehigkeiten.indexOf(faehigkeit);

        if (pos !== -1) {
            this.offeneFaehigkeiten.splice(pos, 1);
            this.charakter.addToLernListe(new Lernfaehigkeit(faehigkeit, this.charakter.abenteurerTypKuerzel));
            console.log('lerneFaehigkeit', this.playerData);
        }
    }

    private lerneWaffe(waffe:Waffe){
        let pos:number = this.offeneWaffen.indexOf(waffe);

        if(pos!== -1) {
            this.offeneWaffen.splice(pos, 1);
            this.charakter.addToLernListe(new Lernfaehigkeit(waffe, this.charakter.abenteurerTypKuerzel));
        }
    }

    private entferneLernfaehigkeit(lernfaehigkeit:Lernfaehigkeit) {
        this.charakter.entferneLernfaehigkeit(lernfaehigkeit);
    }

    private getCharakterByName(charakterName:String):ICharakter {
        let result:ICharakter;

        result = this.playerData.charakterList.find((charakter)=>charakter.name === charakterName);

        return result;
    }

    private initFaehigkeiten(data:Array<IVerbesserung>):void {
        this.faehigkeiten = [];
        this.offeneFaehigkeiten = [];

        data.forEach((faehigkeit)=> {
            this.faehigkeiten.push(Faehigkeit.deserialize(faehigkeit));
        });


        if(this.charakter) {
            this.charakter.faehigkeiten = this.charakter.faehigkeiten || [];
            this.faehigkeiten.forEach((faehigkeit:IVerbesserung)=> {
                if (!this.charakter.faehigkeiten.some((gelernteFaehigkeit)=> {
                        gelernteFaehigkeit.name === faehigkeit.name
                    })) {
                    this.offeneFaehigkeiten.push(faehigkeit);
                }
            });
        }
    }

    private initWaffen(data:Array<IWaffengrundkenntnis>):void {
        this.waffengrundkenntnisse = [];
        this.waffen = [];
        this.offeneWaffen = [];

        data.forEach((waffengrundkenntnis)=> {
            waffengrundkenntnis.waffen.forEach((waffe)=> {
                this.waffen.push(Waffe.deserialize(waffe, waffengrundkenntnis));
            });
        });

        this.charakter.waffen = this.charakter.waffen || [];
        this.waffen.forEach((waffe)=> {
            if (!this.charakter.waffen.some((gelernteWaffe)=> {
                    gelernteWaffe.name === waffe.name
                })) {
                this.offeneWaffen.push(waffe);
            }
        })
    }

    private loadFaehigkeiten():void {
        this.midgardApi.getFaehigkeiten()
            .then(faehigkeiten=> this.initFaehigkeiten(faehigkeiten));
    }

    private loadWaffen():void {
        this.midgardApi.getWaffen()
            .then(waffengrundkenntnisse => this.initWaffen(waffengrundkenntnisse))
    }
}

const charakterVerbessernName = 'charakterVerbessern';

export default charakterVerbessernName;

export var CharakterVerbessernOptions = {
    templateUrl: 'charakter-verbessern.html',
    controller: CharakterVerbessern
};


//
// angular.module(moduleName, [playerApiModule, midgardApiModule])
//     .component('charakterVerbessern', {
//         templateUrl: 'charakter-verbessern.html',
//         controller: CharakterVerbessern
//     });

