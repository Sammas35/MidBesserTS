import AuthInterceptor from './auth-interceptor'

const moduleName = 'appMidBesser.interceptors';
export default moduleName

angular.module(moduleName, [])
    .config(($httpProvider)=> {
        $httpProvider.interceptors.push('AuthInterceptor');
    });
