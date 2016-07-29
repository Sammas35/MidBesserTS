import * as angular from 'angular'
import {IVerbesserung, IWaffe} from 'midgard-api.ts'
import {Lernfaehigkeit} from 'lernfaehigkeit.ts'
import {Charakter} from 'charakter.ts'

export interface ICharakter {
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
    addToLernListe(lernfaehigkeit:Lernfaehigkeit);
    entferneLernfaehigkeit(lernfaehigkeit:Lernfaehigkeit);
}

export interface IPlayerData {
    charakterList:Array<ICharakter>
}

export interface IPlayerApi {
    getPlayerData():IPlayerData
    savePlayerData(playerData:IPlayerData)
    addCharakter(newname:string, newAbenteuerTyp:string):void;
}


class LocalSoragePlayerApi implements IPlayerApi {
    private playerData:IPlayerData;

    getPlayerData():IPlayerData {
        if (!this.playerData) {
            this.playerData = this.readPlayerData();
        }

        return this.playerData;
    }

    readPlayerData():IPlayerData {
        var playerData:IPlayerData;
        var localStorageData;

        localStorageData = localStorage.getItem('midgard.besser.data');

        try {
            if (!localStorageData) {
                playerData =
                {
                    charakterList: [
                        <ICharakter>{
                            name: 'Belgado',
                            abenteurerTyp: 'Söldner',
                            abenteurerTypKuerzel: 'Sö',
                            grad: 9,
                            staerke: 100,
                            geschicklichkeit: 78,
                            konstitution: 82,
                            intelligenz: 99,
                            zaubertalent: 67,
                            faehigkeiten: [],
                            waffen: [],
                            lernen: []
                        }
                    ]
                };
            }else {
                playerData = JSON.parse(localStorageData);
            }
        }
        catch (e) {
            console.log('Cant read local storage.', localStorageData);
        }

        console.log('Playerdata from local storage', playerData);

        if (!playerData) {
            playerData = {
                charakterList: []
            };
        }

        playerData.charakterList = playerData.charakterList.map((charakter)=> {
            return Charakter.deserialize(charakter);
        });

        return playerData;
    }

    savePlayerData(playerData:IPlayerData) {
        this.playerData = playerData;
        var value = JSON.stringify(playerData);
        localStorage.setItem('midgard.besser.data', value);
    }

    addCharakter(newname:string, newAbenteuerTyp:any):void {
        let charakter:Charakter;

        charakter = new Charakter();

        charakter.name = newname;
        charakter.abenteurerTyp = newAbenteuerTyp.name;
        charakter.abenteurerTypKuerzel = newAbenteuerTyp.kuerzel;

        this.playerData.charakterList.push(charakter);
    }

}

const moduleName = 'appMidBesser.playerApi';
export default moduleName

angular.module(moduleName, [])
    .service('playerApi', LocalSoragePlayerApi);
