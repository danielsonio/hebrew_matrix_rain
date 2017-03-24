var symbolSize = 28;
var streams = [];
var fadeInterval = 1.6;
var song;

function setup() {
	song = loadSound("69547__jpors__sjofar.wav");
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	background(0);
	var x = 0;
	for (var i = 0; i <= width / symbolSize; i++) {
		var stream = new Stream();
		stream.generateSymbols(x, random(-2000, 0));
		streams.push(stream);
		x += symbolSize
	}

	textFont("Consolas");
	textSize(symbolSize);
	setTimeout(playSong, 500);
}

function playSong() {
	song.play();
}


function draw() {
	background(0, 80);
	streams.forEach(function(stream){
		stream.render();
	});

}


function Symbol(x, y, speed, first, opacity) {
	this.x = x;
	this.y = y;
	this.value;
	this.speed = speed;
	this.switchInterval = round(random(10, 20));
	this.opacity = opacity;
	this.first = first;

	this.setToRandomSymbol = function() {
		if (frameCount % this.switchInterval == 0) {
			this.value = String.fromCharCode(
				0x05D0 + round(random(0, 30))
			);
		}

	}

	this.rain = function() {
		this.y = (this.y >= height) ? 0 : this.y += this.speed;
	}
}




function Stream() {
	this.symbols = [];
	this.totalSymbols = round(random(5, 30));
	this.speed = random(5, 15);

	this.generateSymbols = function(x, y) {
		var first = round(random(0, 4)) == 1;
		var opacity = 255;
		for (var i =0; i <=this.totalSymbols; i++) {
			symbol = new Symbol(x, y, this.speed, first, opacity);
			symbol.setToRandomSymbol();
			this.symbols.push(symbol);
			opacity -= (255 / this.totalSymbols) / fadeInterval;
			y -= symbolSize;
			first = false;
		}
	}
	this.render = function() {

		this.symbols.forEach(function(symbol) {
			if (symbol.first) {
				fill(140, 255, 180, symbol.opacity);
			} else {
				fill(0, 255, 70, symbol.opacity);
			}
		
			text(symbol.value, symbol.x, symbol.y);
			symbol.rain();
			symbol.setToRandomSymbol();	
		});
	}

}












