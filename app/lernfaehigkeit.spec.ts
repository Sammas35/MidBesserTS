import * as angular from 'angular-mocks'

import {Lernfaehigkeit} from "./lernfaehigkeit";

describe('Lernfaehigkeit', function () {
    beforeEach(angular.module('appMidBesser'));

    it('simple', ()=> {
        expect(true).toBe(true)
    });

    describe('deserialize', ()=> {
        function createInput() {
            return {
                "name": "beidhändiger Kampf",
                "aktuell": null,
                "faktor": 0.5,
                "faehigkeit": {
                    "name": "beidhändiger Kampf",
                    "erstkosten": 1500,
                    "grund": ["BN", "BW", "BS", "Gl", "Kr", "Se", "Sö"],
                    "ausnahme": ["Be", "Dr", "Hl", "Hx", "Ma", "PF", "PH", "PK", "PM", "PT", "PW", "Sc", "Th"],
                    "verbesserungen": [{
                        "erfolgswert": "-3",
                        "kosten": 1000,
                        "$$hashKey": "object:189"
                    }, {
                        "erfolgswert": "-2",
                        "kosten": 3000,
                        "$$hashKey": "object:190"
                    }, {
                        "erfolgswert": "-1",
                        "kosten": 4000,
                        "$$hashKey": "object:191"
                    }
                    ],
                    "$$hashKey": "object:46"
                },
                "stufen": [],
                "geplanteStufen": [{
                    "erfolgswert": "-3",
                    "kosten": 1000,
                    "$$hashKey": "object:189"
                }
                ],
                "offeneStufen": [{
                    "erfolgswert": "-2",
                    "kosten": 3000,
                    "$$hashKey": "object:190"
                }, {
                    "erfolgswert": "-1",
                    "kosten": 4000,
                    "$$hashKey": "object:191"
                }
                ],
                "gelernt": false,
                "$$hashKey": "object:187"
            }
        }

        it('should deserialize flat properties', ()=> {
            let lernfaehigkeit:Lernfaehigkeit;
            let input = createInput();
            lernfaehigkeit = Lernfaehigkeit.deserialize(input);

            expect(lernfaehigkeit.name).toBe('beidhändiger Kampf');
        });
    });
});

