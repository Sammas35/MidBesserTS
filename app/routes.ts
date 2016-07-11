const moduleName = 'appMidBesser.routes'
export default moduleName

angular.module(moduleName, [])
    .config(($routeProvider:angular.route.IRouteProvider) => {
        $routeProvider
            .when('/', {
                template: '<charakter-index></charakter-index>'
            })
            .when('/:charakter', {
                template: '<charakter-verbessern></charakter-verbessern>'
            })
        ;
    });
