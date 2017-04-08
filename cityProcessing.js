var grid = 64;

var canvas2 = document.createElement('canvas');
var context = canvas2.getContext('2d');
var density = [];
var avg = [];

function previewFile() {
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.addEventListener("load", function (e) {
  	    img2 = new Image();
        img2.onload = function() {
        	width2 = img2.width;
		    height2 = img2.height;
//		    console.log(width2, height2)
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
	for (var i = 0; i < height2; i++) {
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
	for (var i = 0; i <= Math.floor(height2 / grid); i++) {
		avg.push([]);
	}
	for (var i = 0; i <= Math.floor(height2 / grid); i++) {
		for (var j = 0; j <= Math.floor(width2 / grid); j++) {
			avg[i][j] = 0;
		}
	}
//	console.log(avg, Math.floor(height2 / grid))
	for (var i = 0; i < height2; i++) {
		for (var j = 0; j < width2; j++) {
//			if (Math.floor(i / grid) >= Math.floor(height2 / grid)) {
//				console.log(Math.floor(i/grid)) }
//			if (i < 4) {
//			console.log(density[i][j]);
//			console.log(Math.floor(i/grid), Math.floor(j/grid), avg[Math.floor(i/grid)][Math.floor(j/grid)])	}		
			avg[Math.floor(i/grid)][Math.floor(j/grid)] += density[i][j];
//			if (i < 4)
//			console.log(Math.floor(i/grid), Math.floor(j/grid), avg[Math.floor(i/grid)][Math.floor(j/grid)])			
		}
	}
//	console.log(avg);
	for (var i = 0; i <= Math.floor(height2 / grid); i++) {
		for (var j = 0; j <= Math.floor(width2 / grid); j++) {
			avg[i][j] /= (grid * grid);
		}
	}
	findMax();
};

var findMax = function () {
	var h = Math.floor(height2 / grid) + 1;
	var w = Math.floor(width2 / grid) + 1;
	var max1 = -999;
	var xy1 = [-1,-1];
	var max2 = -999;
	var xy2 = [-1,-1];
	for (var i = 0; i < h; i++) {
		for (var j = 0; j < w; j++) {
			if (avg[i][j] > max1) {
				max1 = avg[i][j];
				xy1[0] = i;
				xy1[1] = j;
			} else if (avg[i][j] >= max2) {
				max2 = avg[i][j];
				xy2[0] = i;
				xy2[1] = j;
			}
		}
	}
//	while (xy1[1] < xy2[1] - h / 2 || xy1[1] > xy2[1] + h / 2) {
//		rotate(0, h, 0, w)
//	}
    best_fit(0, Math.PI, -1)
};
/*
var rotate = function(b, t, l, r) {
	if (b < t && l < r) {
		var turns = rotate(b + 1, t - 1, l + 1, r - 1)
	} else {
		return 1;
	}

	return turns + 1;
}*/

var result = function(i) {
	document.getElementById("result").src = "leaf" + (i + 1) + ".png";
}
