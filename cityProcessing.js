var grid = 64;

var canvas2 = document.createElement('canvas');
var context = canvas2.getContext('2d');
var density = [];
var avg = new Array(grid);

function previewFile() {
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.addEventListener("load", function (e) {
  	    img2 = new Image();
        img2.onload = function() {
        	width2 = img2.width;
		    height2 = img2.height;
		    canvas2.width = img2.width;
		    canvas2.height = img2.height;
    	    context.drawImage(img2, 0, 0);
        	img2 = context.getImageData(0, 0, width2, height2);
  			city = img2.data;
  			reduce(city);
    	};
    	img2.src = e.target.result;
    	preview.src = reader.result;
  	}, false);

  	if (file) {
    	reader.readAsDataURL(file);
  	}
}

var reduce = function(array) {
	for (var i = 0; i < width2; i++) {
		density.push([]);
	}
	var k = 0;
	for (var i = 0; i < height2; i++) {
		for (var j = 0; j < width2; j++) {
			density[i][j] = array[k] - array[k + 1] - array[k + 2];
			k += 4;
		}

	}
	splitAndAverage();
};

var splitAndAverage = function () {
	for (var i = 0; i < grid; i++) {
		var sum = 0;
		for (var j = grid * i; j < grid * (i + 1) && j < height2; j++) {
			sum += density[j];	
		}
		avg = sum / grid;
	}
};