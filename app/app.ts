import * as angular from 'angular'
import 'angular-route'

import routes from 'routes.ts'
// import main from 'main.ts'
import charakterIndexName, {CharakterIndexOptions} from 'charakter-index.ts'
import charakterDetailName, {CharakterDetailOptions} from 'charakter-detail.ts'
import charakterVerbessernName, {CharakterVerbessernOptions} from 'charakter-verbessern.ts'
// import charakterVerbessern from 'charakter-verbessern.ts'
import playerApiModule from 'services/player-api.ts'
import midgardApiModule from 'services/midgard-api.ts'



angular
    .module('appMidBesser', [
        'ngRoute'
        , routes
        // , main
        // , charakterVerbessern
        , playerApiModule
        , midgardApiModule
    ])
    //.service('authInterceptor', authInterceptor)
    //.config($httpProvider => {
    //    $httpProvider.interceptors.push('authInterceptor');
    //})
    .component(charakterDetailName, CharakterDetailOptions)
    .component(charakterVerbessernName, CharakterVerbessernOptions)
    .component(charakterIndexName, CharakterIndexOptions)
;

import 'charakter-index.ts'

//import {CharakterIndex} from 'charakter-index.ts'
