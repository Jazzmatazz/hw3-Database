// Connects to server:
var socket = io.connect("http://76.28.150.193:8888");

// My own function to load data
var loadData = function () {
	socket.emit("load", {studentname: "Jasmine Pedersen", statename: "Cat Mouse Data"});
};

// My own function to save data
var saveData = function () {
    console.log("Saving the amimals!");
    
    var savedEntities = [];
    for (var i = 0; i < gameEngine.entities.length; i++) {
        savedEntities.push( {type: gameEngine.entities[i].type, mouseKilledCount: gameEngine.entities[i].mouseKilledCount, radius: gameEngine.entities[i].radius, visualRadius: gameEngine.entities[i].visualRadius, width: gameEngine.entities[i].width, height: gameEngine.entities[i].height, it: gameEngine.entities[i].it, x: gameEngine.entities[i].x, y: gameEngine.entities[i].y, velocityX: gameEngine.entities[i].velocity.x, velocityY: gameEngine.entities[i].velocity.y} );
    }

    socket.emit("save", {
        studentname: "Jasmine Pedersen",
        statename: "Cat Mouse Data",
        entities: savedEntities
    });
};
	
socket.on("load", function (data) {
	console.log("Loading amimals..");
    gameEngine.entities = []; //Clear out the entities

    // Recreate each entity
    for (var i = 0; i < data.entities.length; i++) {
		var animal = new Circle(gameEngine, data.entities[i].type);//recreate your entity)
        animal.mouseKilledCount = data.entities[i].mouseKilledCount;
        animal.radius = data.entities[i].radius;
        animal.visualRadius = data.entities[i].visualRadius;
        animal.width = data.entities[i].width;
        animal.height = data.entities[i].height;
        animal.it = data.entities[i].it;
        animal.x = data.entities[i].x;
        animal.y = data.entities[i].y;
        animal.velocity.x = data.entities[i].velocityX;
        animal.velocity.y = data.entities[i].velocityY;
        gameEngine.addEntity(animal);
        console.log("added animal back");
    }

});
	
// Chris's code:
window.onload = function () {
    console.log("starting up da sheild");

    socket.on("ping", function (ping) {
        console.log(ping);
        socket.emit("pong");
    });

    socket.on("connect", function () {
        console.log("Socket connected.")
    });
    socket.on("disconnect", function () {
        console.log("Socket disconnected.")
    });
    socket.on("reconnect", function () {
        console.log("Socket reconnected.")
    });

};