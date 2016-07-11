var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var _ = require('lodash');
var fs = require('fs');
var uuid = require('node-uuid');

var server;
var port;
var app = express();

var skills;
var characterList;
var tokenHash = {};
var userlist = {
    'a': 'a'
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

port = (process.env.PORT || 3100);

app.set('port', port);

characterList = loadCharacterList();

//-----------------------------------------------------------------------------------------------------------
// routes
//-----------------------------------------------------------------------------------------------------------
app.get('/api/char/:user',
    //interceptAuthToken,
    handleGetCharUser);

app.get('/api/char/:user/:charname',
    //interceptAuthToken,
    handleGetCharUserCharname);

app.post('/api/auth/login',
    handlePostAuthLogin);

//-----------------------------------------------------------------------------------------------------------
// static routes
//-----------------------------------------------------------------------------------------------------------
app.use(express.static(__dirname + '/app'));

//-----------------------------------------------------------------------------------------------------------
// start server
//-----------------------------------------------------------------------------------------------------------
server = http.createServer(app);

server.listen(port);

console.log("Server running on port " + port);

//-----------------------------------------------------------------------------------------------------------
// util methods
//-----------------------------------------------------------------------------------------------------------

function sendData(response, data) {
    var result = {
        errorCode: null,
        data: data
    };

    response.send(result);
}

function sendError(response, error) {
    var result = {
        errorCode: error,
        data: null
    };

    response.send(result);
}

function loadCharacterList() {
    var result = [];

    result.push({
        name: 'Belgado',
        level: 9,
        charClass: {
            shortcut: 'Sö',
            name: 'Söldner'
        },
        skills: [{
            name: 'beidhändiger Kampf',
            value: '-3'
        }]
    });

    return result;
}

//-----------------------------------------------------------------------------------------------------------
// interceptors
//-----------------------------------------------------------------------------------------------------------

function interceptAuthToken(req, res, next) {
    var token = req.get('X-AUTH-TOKEN');
    var errorMessage = 'invalid auth token';
    console.log('AuthToken');

    if (tokenHash[token]) {
        next();
    } else {
        console.log(errorMessage);
        res.statusCode = 401;
        res.send({errorCode: 1, data: errorMessage});
    }
}

//-----------------------------------------------------------------------------------------------------------
// routes handler
//-----------------------------------------------------------------------------------------------------------

function handleGetCharUserCharname(req, res) {
    var result;
    var charname;
    var user;

    charname = req.params.charname;
    user = req.params.user;

    console.log('char/:user/:charname called : ' + user + '/' + charname);

    result = _.find(characterList, function (character) {
        if (character.name === charname) {
            return true;
        }
        return false;
    });

    res.send(result);
}
function handlePostAuthLogin(req, res) {
    var credentials = req.body;
    var result;
    var newtoken;

    console.log('log in from : ' + credentials.username);
    if (userlist[credentials.username]
        && userlist[credentials.username] === credentials.password) {

        console.log('authentified: ' + credentials.username);

        newtoken = uuid.v4();
        tokenHash[newtoken] = true;
        result = {
            errorCode: undefined,
            data: 'Ok'
        };
        res.setHeader('X-AUTH-TOKEN', newtoken);
        res.statusCode = 200;
    } else {
        console.log('invalid login : ' + credentials.username);
        res.statusCode = 401;
    }

    res.send(result);
}

function getCharnamesFromFiles(files) {
    fs.readFile(files[0], function () {
    });
}

function handleGetCharUser(req, res) {
    var user;
    user = req.params.user;

    console.log('/char/:user called for ' + user);

    fs.readdir('./data/' + user, function (err, files) {
        if (err) {
            sendError(res, err);
        }

        var charnames = getCharnamesFromFiles(files);
        res.write(JSON.stringify({errorCode: null, data: charnames}));

        res.end();
        //sendData(res, files);
    });
};
