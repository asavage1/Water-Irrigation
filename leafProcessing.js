// script.js
// Andrew Savage and Elias Marcopoulos

//constants:
var split_size = 256;

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
    avg_pixels();
}

var split_img = function() {
    condensed_img = []

    array_ind = 0;
    for (var l = 0; l < height; l += split_size) {
        condensed_img.push([]);
        
        cur_height = Math.min(l + split_size, height);
  
        for (var k = 0; k < 4 * width; k += 4 * split_size) {
            cur_width = Math.min(k + 4 * split_size, 4 * width);
            var avg_red = 0;
            var avg_green = 0;
            var avg_blue = 0;
            var avg_alpha = 0;

            for (var j = l; j < cur_height; j++) {
                for (var i = k; i < cur_width; i+= 4) {
                    var n = j * height + i;                    
                    avg_red += pix[n] / (cur_width * cur_height);
                    avg_green += pix[n + 1] / (cur_width * cur_height);
                    avg_blue += pix[n + 2] / (cur_width * cur_height);
                    avg_alpha += pix[n + 3] / (cur_width * cur_height);
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

var avg_pixels = function() {
    for (var l = 0; l < height; l += split_size) { //current block height
        
        cur_height = Math.min(l + split_size, height);
  
        for (var k = 0; k < 4 * width; k += 4 * split_size) { //cur block width
            cur_width = Math.min(k + 4 * split_size, 4 * width);
            var avg_red = 0;
            var avg_green = 0;
            var avg_blue = 0;
            var avg_alpha = 0;

            for (var j = l; j < cur_height; j++) {
                for (var i = k; i < cur_width; i+= 4) {
                    var n = j * height + i; //pixel index in pix
                    var avg_boxes = take_avg_boxes(condensed_img, l, k);
                    var diff = compute_diff(pix[n:n+3], avg_boxes);
                    
                }
            }
        }
    }
}

var take_avg_boxes = function(cimg, i, j) {
    var avg_red = 0
    var avg_green = 0;
    var avg_blue = 0;
    var avg_alpha = 0;
    var total = 0;
    var left = (i - 1 >= 0);
    var right = (i + 1 < cimg.length);
    var up = (j - 1 >= 0);
    var down = (j + 1 < cimg[0].length);

    total++;
    avg_red += cimg[i][j];
    avg_green += cimg[i + 1][j];
    avg_blue += cimg[i + 2][j];
    avg_alpha += cimg[i + 3][j];
    
    if (left) {
        total++;
        avg_red += cimg[i - 4][j];
        avg_green += cimg[i - 3][j];
        avg_blue += cimg[i - 2][j];
        avg_alpha += cimg[i - 1][j];

        if (up) {
            total++;
            avg_red += cimg[i - 4][j - 1];
            avg_green += cimg[i - 3][j - 1];
            avg_blue += cimg[i - 2][j - 1];
            avg_alpha += cimg[i - 1][j - 1];
        }

        if (down) {
            total++;
            avg_red += cimg[i - 4][j + 1];
            avg_green += cimg[i - 3][j + 1];
            avg_blue += cimg[i - 2][j + 1];
            avg_alpha += cimg[i - 1][j + 1];
        }
    }

    if (right) {
        total++;
        avg_red += cimg[i + 5][j];
        avg_green += cimg[i + 6][j];
        avg_blue += cimg[i + 7][j];
        avg_alpha += cimg[i + 8][j];

        if (up) {
            total++;
            avg_red += cimg[i + 5][j - 1];
            avg_green += cimg[i + 6][j - 1];
            avg_blue += cimg[i + 7][j - 1];
            avg_alpha += cimg[i + 8][j - 1];
        }

        if (down) {
            total++;
            avg_red += cimg[i + 5][j + 1];
            avg_green += cimg[i + 6][j + 1];
            avg_blue += cimg[i + 7][j + 1];
            avg_alpha += cimg[i + 8][j + 1];
        }
    }

    if (up) {
        total++;
        avg_red += cimg[i + 1][j - 1];
        avg_green += cimg[i + 2][j - 1];
        avg_blue += cimg[i + 3][j - 1];
        avg_alpha += cimg[i + 4][j - 1];
    }

    if (down) {
        total++;
        avg_red += cimg[i + 1][j + 1];
        avg_green += cimg[i + 2][j + 1];
        avg_blue += cimg[i + 3][j + 1];
        avg_alpha += cimg[i + 4][j + 1];
    }

    avg_red /= total;
    avg_green /= total;
    avg_blue /= total;
    avg_alpha /= total;
    return [avg_red, avg_green, avg_blue, avg_alpha];
}

var compute_diff = function(v1, v2) { //v1.length = v2.length
    var sum = 0;
    for (var i = 0; i < v1.length; i++) {
        sum += v1[i] - v2[i];
    }
    return sum;
}
