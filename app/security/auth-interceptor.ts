'use strict';

let authInterceptor = class AuthInterceptor{
    public request(){
        console.log('AuthInterceptor request');
    }
    public response(){
        console.log('AuthInterceptor response');
    }
    public responseError(){
        console.log('AuthInterceptor responseError');
    }
};

authInterceptor.$inject = ['$q'];

export default authInterceptor;