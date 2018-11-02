var express = require('express'),
    app = express(),
    port = 5000,
    usernames = [],
    


server = app.listen(port, function () {
    console.log(`server is running on port ${port}`)
});


var io = require('socket.io').listen(server);


io.sockets.on('connection', function (socket) {

    socket.on('new user', (data, callback) => {
        if (usernames.indexOf(data) != -1) {
            callback(false);
        } else {
            callback(true);
            socket.username = data;
            usernames.push(socket.username);
            console.log(socket.username+ ' connected .....')
            updateUsernames()
        }
    });

    function updateUsernames() {
        io.sockets.emit('usernames', usernames)
    }
    socket.on('send message', function (data) {
        io.sockets.emit('new message', {
            msg: data,
            author: socket.username,
        });
    });

       
    
    socket.on('disconnect', () => {
        if (!socket.username) {
            return
        }
        console.log(socket.username + ' disconnected...')
        usernames.splice(usernames.indexOf(socket.username), 1);
        updateUsernames();
    })
});
