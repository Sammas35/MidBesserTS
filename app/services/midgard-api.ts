import * as angular from 'angular'

import {Stufe} from 'stufe.ts'

export interface IVerbesserung{
    name:string;
    erstkosten:number;
    grund:Array<string>;
    ausnahme:Array<string>;
    verbesserungen:Array<Stufe>
    berechneFaktor(abenteuerTypKuerzel:string):number;
}

export interface IWaffe{
    name:string;
    staerke:number;
    geschicklichkeit:number;
    schwierigkeit:number;
}

export interface IWaffengrundkenntnis{
    name:string;
    waffen:Array<IWaffe>;
}

export interface IMidgardApi{
    getFaehigkeiten() : angular.IPromise<Array<IVerbesserung>>
    getWaffen() : angular.IPromise<Array<IWaffengrundkenntnis>>
}

interface IWaffengrundkenntnisData{
    waffengrundkenntnisse:Array<IWaffengrundkenntnis>;
}

class HttpMidgardApi implements IMidgardApi {

    constructor(private $http: angular.IHttpService){}

    getFaehigkeiten():angular.IPromise<Array<IVerbesserung>> {
        return this.$http.get<IVerbesserung[]>('data/skills.json')
            .then(faehigkeitenResponse => faehigkeitenResponse.data);
    }
    getWaffen():angular.IPromise<Array<IWaffengrundkenntnis>> {
        return this.$http.get<IWaffengrundkenntnisData>('data/waffen.json')
            .then(waffengrundkenntnisResponse => waffengrundkenntnisResponse.data.waffengrundkenntnisse);
    }
}

const moduleName = 'appMidBesser.midgardApi';
export default moduleName

angular.module(moduleName, [])
    .service('midgardApi', HttpMidgardApi);
