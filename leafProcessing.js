// script.js
// Andrew Savage and Elias Marcopoulos

//constants:
var split_size = 64;

var img = document.getElementById('leaf1.png');
var canvas = document.createElement('canvas');





var img = new Image();
img.src = "leaf1.png" //Relative directory of the image
img.onload = function() {
    width = img.width;
    height = img.height;
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    imgd = canvas.getContext('2d').getImageData(0, 0, width, height);
    pix = imgd.data;
    split_img();
}


/*
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.drawImage(img, 0, 0);
var imgData = canvas.getImageData(x, y, width, height).data;
*/


var split_img = function() {
    condensed_img = []

    array_ind = 0;
    for (var l = 0; l < height; l += split_size) {
        condensed_img.push([]);
        
        cur_height = Math.min(l + split_size, height);
  
        for (var k = 0; k < 4 * width; k += 4 * split_size) {
            cur_width = Math.min(k + 4 * split_size, width);
            var avg_red = 0;
            var avg_green = 0;
            var avg_blue = 0;
            var avg_alpha = 0;

            for (var j = l; j < cur_height; j++) {
                for (var i = k; i < cur_width; i+= 4) {
                    var n = j * height + i;                    
                    avg_red += pix[n] / (cur_width * cur_height);
                    avg_green += pix[n + 1] / (cur_width * cur_height);
                    avg_blue = pix[n + 2] / (cur_width * cur_height);
                    avg_alpha = pix[n + 3] / (cur_width * cur_height);
                }
            }
      
            condensed_img[array_ind].push(avg_red);
            condensed_img[array_ind].push(avg_green);
            condensed_img[array_ind].push(avg_blue);
            condensed_img[array_ind].push(avg_alpha);
        }
        array_ind++;
    }
    console.log(condensed_img);
}


