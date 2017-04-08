// script.js
// Andrew Savage and Elias Marcopoulos

//constants:
var split_size = 256;


var split_img = function() {
    condensed_img = []

    var array_ind = 0;
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
    leaf_density = new Array(height);
    for (var x = 0; x < height; x++) {
        leaf_density[x] = new Array(width);
    }
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
                    var avg_boxes = take_avg_boxes(l / split_size, k / split_size);
                    var diff = compute_diff(pix.slice(n, n+3), avg_boxes);
                    leaf_density[j][i / 4] = diff;
                }
            }
        }
    }
    console.log(leaf_density);
}

var take_avg_boxes = function(i, j) { //using condensed_img
    var avg_red = 0
    var avg_green = 0;
    var avg_blue = 0;
    var avg_alpha = 0;
    var total = 0;
    var up = (i - 1 >= 0);
    var down = (i + 1 < condensed_img.length);
    var left = (j - 4 >= 0);
    var right = (j + 5 < condensed_img[0].length);

    total++;
    //console.log(i, condensed_img.length);
    //console.log(j, condensed_img[0].length);
    if (i > condensed_img.length || j > condensed_img[0].length) {
        console.log(i, j, condensed_img.length, condensed_img[0].length);
    }
    
    avg_red += condensed_img[i][j];
    avg_green += condensed_img[i][j + 1];
    avg_blue += condensed_img[i][j + 2];
    avg_alpha += condensed_img[i][j + 3];
    
    if (left) {
        total++;
        avg_red += condensed_img[i][j - 4];
        avg_green += condensed_img[i][j - 3];
        avg_blue += condensed_img[i][j - 2];
        avg_alpha += condensed_img[i][j - 1];

        if (up) {
            total++;
            avg_red += condensed_img[i - 1][j - 4];
            avg_green += condensed_img[i - 1][j - 3];
            avg_blue += condensed_img[i - 1][j - 2];
            avg_alpha += condensed_img[i - 1][j - 1];
        }

        if (down) {
            total++;
            avg_red += condensed_img[i + 1][j - 4];
            avg_green += condensed_img[i + 1][j - 3];
            avg_blue += condensed_img[i + 1][j - 2];
            avg_alpha += condensed_img[i + 1][j - 1];
        }
    }

    if (right) {
        total++;
        avg_red += condensed_img[i][j + 5];
        avg_green += condensed_img[i][j + 6];
        avg_blue += condensed_img[i][j + 7];
        avg_alpha += condensed_img[i][j + 8];

        if (up) {
            total++;
            avg_red += condensed_img[i - 1][j + 5];
            avg_green += condensed_img[i - 1][j + 6];
            avg_blue += condensed_img[i - 1][j + 7];
            avg_alpha += condensed_img[i - 1][j + 8];
        }

        if (down) {
            total++;
            avg_red += condensed_img[i + 1][j + 5];
            avg_green += condensed_img[i + 1][j + 6];
            avg_blue += condensed_img[i + 1][j + 7];
            avg_alpha += condensed_img[i + 1][j + 8];
        }
    }

    if (up) {
        total++;
        avg_red += condensed_img[i - 1][j + 1];
        avg_green += condensed_img[i - 1][j + 2];
        avg_blue += condensed_img[i - 1][j + 3];
        avg_alpha += condensed_img[i - 1][j + 4];
    }

    if (down) {
        total++;
        avg_red += condensed_img[i + 1][j + 1];
        avg_green += condensed_img[i + 1][j + 2];
        avg_blue += condensed_img[i + 1][j + 3];
        avg_alpha += condensed_img[i + 1][j + 4];
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
