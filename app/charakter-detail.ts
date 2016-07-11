import * as angular from 'angular'

import playerApiModule, {IPlayerApi, IPlayerData, ICharakter} from 'services/player-api.ts'


const charakterDetailName = 'charakterDetail';

export default charakterDetailName;

class CharakterDetail {
}

export var CharakterDetailOptions = {
    templateUrl: 'charakter-detail.html',
    controller: CharakterDetail,
    bindings: {charakter: '<'}
};


