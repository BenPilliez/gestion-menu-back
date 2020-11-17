const io = require('socket.io')();

var Socket = {
    emit: function (event, data) {
        io.sockets.emit(event, data);
    }
};

io.on("connection", function (socket) {
    console.log("Le front est connecté");
});

module.exports = {
    Socket,
    io
}
