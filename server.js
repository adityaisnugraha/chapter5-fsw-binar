const http = require('http');
const express = require('express');
const { getUsers } = require('./helper');

       
const server = express();

server.set('view engine', 'ejs');
server.set('views', 'public');
server.use(express.json());
server.use('/static', express.static('public/static'))

server.get('/', function(req, res) {
    // res.sendFile('public/chapter3.html', {root: __dirname});
    res.render(`chapter3.ejs`, {
        headerText: 'PLAY TRADITIONAL GAMEe'
    });
});

server.get('/chapter4', function(req, res) {
    res.sendFile('public/chapter4.html', {root: __dirname});
});

server.get('/api/v1/accounts', function(req, res) {
    const users = getUsers();

    const result = users.map(function(user) {
        return {
            username: user.username,
        }
    });

    res.json(result);
});

server.post('/api/v1/accounts/login', function(req, res) {
    const { username, password } = req.body;

    const users = getUsers();

    const found = users.find(function(user) {
        return user.username === username;
    });

    if (found) {
        const passwordMatch = found.password === password;

        if (!passwordMatch) {
            res.status(400);
            res.json({
                error: 'password atau password salah'
            });
        } else {
            res.json({
                id: found.id
            });
        }
    } else {
        res.status(400);
        res.json({
            error: 'password atau password salah'
        });
    }
});

server.listen(5050);