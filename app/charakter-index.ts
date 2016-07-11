import * as angular from 'angular'

import playerApiModule, {IPlayerApi, IPlayerData, ICharakter} from 'services/player-api.ts'

const charakterIndexName = 'charakterIndex';

export default charakterIndexName;

class CharakterIndex {
    private playerData:IPlayerData;
    private currentCharakter:ICharakter;

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
