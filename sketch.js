// This is the puzzle image!
let source;

// Store Tile Order
let board = [];

// Tile / Grid config
let tiles = [];
let cols = 5;
let rows = 5;
let w, h;

// Tile object
class Tile {
	constructor(i, img) {
		this.index = i;
		this.img = img;
	}
}

// This loads our board image.
function preload() {
	source = loadImage('./puzzle.jpeg');
}

function setup() {
	createCanvas(500, 500);
	// Calculating tile size using width/height of screen
	w = width / cols;
	h = height / rows;

	// Subdividing the image into individual tiles
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let x = i * w;
			let y = j * h;

			// Creating an image with height and width;
			let img = createImage(w, h);
			// Copy the section of the image at X, Y with a width and height of the tile size. Then copy it to a new tile.
			img.copy(source, x, y, w, h, 0, 0, w, h);

			// Calculate position of the tile and push it to the board array.
			let index = i + j * cols;
			board.push(index);

			// Create a tile with params of Index and a copy of the created image
			let tile = new Tile(index, img);
			tiles.push(tile);
		}
	}
	// remove the last generated tile
	tiles.pop();
	board.pop();
	board.push(-1);

	// Shuffle the board :D
	TruffleShuffle(board);
}

// Random Move Thing
function randomMove(arr) {
	let r1 = floor(random(cols));
	let r2 = floor(random(rows));
	move(r1, r2, arr);
}
// Shuffle Board Function
function TruffleShuffle(arr) {
	for (let i = 0; i < 1000; i++) {
		randomMove(arr);
	}
}
// Find blank tile
function findBlank() {
	for (let i = 0; i < board.length; i++) {
		if (board[i] == -1) return i;
	}
}
// Swap func for swamping two elements in tiles / board array
function swap(i, j, arr) {
	let temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}
// Visibly move tiles
function move(i, j, arr) {
	let blank = findBlank();
	let blankCol = blank % cols;
	let blankRow = floor(blank / rows);
	// Is the move valid?
	if (isNeighbor(i, j, blankCol, blankRow)) {
		swap(blank, i + j * cols, arr);
	}
	// Is there a neighbor?
	function isNeighbor(i, j, x, y) {
		if (i !== x && j !== y) {
			return false;
		}
		if (abs(i - x) == 1 || abs(j - y) == 1) {
			return true;
		}
		return false;
	}
}
// If mouse clicked, move
function mousePressed() {
	let i = floor(mouseX / w);
	let j = floor(mouseY / h);
	move(i, j, board);
}

function draw() {
	background(50);
	// Draw the board
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let index = i + j * cols;
			let x = i * w;
			let y = j * h;
			let tileIndex = board[index];

			if (tileIndex > -1) {
				let img = tiles[tileIndex].img;
				image(img, x, y, w, h);
			}
		}
	}
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let x = i * w;
			let y = j * h;
			strokeWeight(2);
			noFill();
			rect(x, y, w, h);
		}
	}
}
