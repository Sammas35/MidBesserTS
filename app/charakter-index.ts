import * as angular from 'angular'

import playerApiModule, {IPlayerApi, IPlayerData, ICharakter} from 'services/player-api.ts'

const charakterIndexName = 'charakterIndex';

export default charakterIndexName;

class CharakterIndex {
    private playerData:IPlayerData;
    private currentCharakter:ICharakter;
    private abenteuerTypList = [
        {name: 'Assassine', kuerzel: 'As'},
        {name: 'Barbar Nordland', kuerzel: 'BN'},
        {name: 'Barbar Steppe', kuerzel: 'BS'},
        {name: 'Barbar Wald', kuerzel: 'BW'},
        {name: 'Barde', kuerzel: 'Ba'},
        {name: 'Glücksritter', kuerzel: 'Gl'},
        {name: 'Händler', kuerzel: 'Hä'},
        {name: 'Krieger', kuerzel: 'Kr'},
        {name: 'Ordenskrieger', kuerzel: 'Or'},
        {name: 'Seefahrer', kuerzel: 'Se'},
        {name: 'Söldner', kuerzel: 'Sö'},
        {name: 'Spitzbube', kuerzel: 'Sp'},
        {name: 'Waldläufer', kuerzel: 'Wa'},
        {name: 'Beschwörer', kuerzel: ''},
        {name: 'Druide', kuerzel: ''},
        {name: 'Heiler', kuerzel: ''},
        {name: 'Hexer', kuerzel: ''},
        {name: 'Magier', kuerzel: ''},
        {name: 'Priester Fruchtbarkeit', kuerzel: ''},
        {name: 'Priester Herrschaft', kuerzel: ''},
        {name: 'Priester Krieg', kuerzel: ''},
        {name: 'Priester Meer', kuerzel: ''},
        {name: 'Priester Weisheit', kuerzel: ''},
        {name: 'Priester Tod', kuerzel: ''},
        {name: 'Schamane', kuerzel: ''},
        {name: 'Thaumaturg', kuerzel: ''},
    ];
    private newname:string;
    private newAbenteuerTyp:string;

    constructor(private playerApi:IPlayerApi) {
        this.playerData = playerApi.getPlayerData();
        console.log('CharakterIndex playerData', this.playerData);
    }

    setCurrentCharakter(charakter:ICharakter):void {
        console.log('setCurrentCharakter', charakter);
        this.currentCharakter = charakter;
    }

    save() {
        console.log('save', this.playerData);
        this.playerApi.savePlayerData(this.playerData);
    }

    newCharakter(){
        console.log('new Charakter: ', this.newname, this.newAbenteuerTyp);
        this.playerApi.addCharakter(this.newname, this.newAbenteuerTyp);
    }
    
    nameExists(newname):boolean{

        if(this.playerData){
            return this.playerData.charakterList.some((charakter)=>charakter.name === newname)
        }

        return false;
    }
}

export var CharakterIndexOptions = {
    templateUrl: 'charakter-index.html',
    controller: CharakterIndex
};

// angular
//     .module('appMidBesser')
//     .component(charakterIndexName, CharakterIndexOptions);


// const moduleName = 'appMidBesser.charakter-index';
// export default moduleName;

// angular.module('appMidBesser')
//     .component('charakterIndex', {
//         templateUrl: 'charakter-index.html',
//         controller: CharakterIndex
//     });
