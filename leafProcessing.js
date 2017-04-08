// script.js
// Andrew Savage and Elias Marcopoulos

//constants:
var split_size = 64;


var split_img = function() {
    condensed_img = new Array(Math.ceil(height / split_size));
    for (var i = 0; i < condensed_img.length; i++) {
        condensed_img[i] = new Array(Math.ceil(width / split_size));
        for (var j = 0; j < condensed_img[i].length; j++) {
            condensed_img[i][j] = new Array(4);
            for (var k = 0; k < 4; k++) {
                condensed_img[i][j][k] = 0;
            }
        }
    }

    counter = 0;
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            for (var k = 0; k < 4; k++) {
                condensed_img[Math.floor(i / split_size)][Math.floor(j / split_size)][k] += pix[counter] / Math.pow(split_size, 2);
                counter++;
            }
        }
    }
    avg_pixels();
}

/*
var split_img = function() {
    condensed_img = [];

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
            var total_red = 0;
            var total_green = 0;
            var total_blue = 0;
            var total_alpha = 0;
            
            for (var j = l; j < cur_height; j++) {
                for (var i = k; i < cur_width; i+= 4) {
                    var n = j * width * 4 + i;                    
                    total_red += pix[n];
                    total_green += pix[n + 1];
                    total_blue += pix[n + 2];
                    total_alpha += pix[n + 3];
                }
            }
            
            for (var j = l; j < cur_height; j++) {
                for (var i = k; i < cur_width; i+= 4) {
                    var n = j * width * 4 + i;                    
                    avg_red += pix[n] / total_red;
                    avg_green += pix[n + 1] / total_green;
                    avg_blue += pix[n + 2] / total_blue;
                    avg_alpha += pix[n + 3] / total_alpha;
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
*/

var avg_pixels = function() {
    leaf_contrast = new Array(height);
    for (var i = 0; i < leaf_contrast.length; i++) {
        leaf_contrast[i] = new Array(width);
    }

    count = 0;
    for (var i = 0; i < leaf_contrast.length; i++) {
        for (var j = 0; j < leaf_contrast[i].length; j++) {
            var avg_boxes = take_avg_boxes(Math.floor(i / split_size), Math.floor(j / split_size));
            leaf_contrast[i][j] = compute_diff(pix.slice(count,count+3),avg_boxes);
            count+=4;
        }
    }

    contrasts[THECOUNT - 1] = leaf_contrast;
    convert_final();
}

/*
var avg_pixels = function() {
    
    testing = []; // TESTING ARRAY, REMOVE

    
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
                    var n = j * width * 4 + i; //pixel index in pix
                    var avg_boxes = take_avg_boxes(l / split_size, k / split_size);
                    var diff = compute_diff(pix.slice(n, n+3), avg_boxes);
                    
                    leaf_density[j][i / 4] = diff;
                }
            }
        }
    }
    console.log(leaf_density);
}*/

var take_avg_boxes = function(i, j) { //using condensed_img
    var avg_red = 0
    var avg_green = 0;
    var avg_blue = 0;
    var avg_alpha = 0;
    var total = 0;
    var up = (i - 1 >= 0);
    var down = (i + 1 < condensed_img.length);
    var left = (j - 1 >= 0);
    var right = (j + 1 < condensed_img[0].length);

    total++;
    //console.log(i, condensed_img.length);
    //console.log(j, condensed_img[0].length);
    /*
    if (i > condensed_img.length || j > condensed_img[0].length) {
        console.log(i, j, condensed_img.length, condensed_img[0].length);
    }
    */
    
    avg_red += condensed_img[i][j][0];
    avg_green += condensed_img[i][j][1];
    avg_blue += condensed_img[i][j][2];
    avg_alpha += condensed_img[i][j][3];
    
    if (left) {
        total++;
        avg_red += condensed_img[i][j - 1][0];
        avg_green += condensed_img[i][j - 1][1];
        avg_blue += condensed_img[i][j - 1][2];
        avg_alpha += condensed_img[i][j - 1][3];

        if (up) {
            total++;
            avg_red += condensed_img[i - 1][j - 1][0];
            avg_green += condensed_img[i - 1][j - 1][1];
            avg_blue += condensed_img[i - 1][j - 1][2];
            avg_alpha += condensed_img[i - 1][j - 1][3];
        }

        if (down) {
            total++;
            avg_red += condensed_img[i + 1][j - 1][0];
            avg_green += condensed_img[i + 1][j - 1][1];
            avg_blue += condensed_img[i + 1][j - 1][2];
            avg_alpha += condensed_img[i + 1][j - 1][3];
        }
    }

    if (right) {
        total++;
        avg_red += condensed_img[i][j + 1][0];
        avg_green += condensed_img[i][j + 1][1];
        avg_blue += condensed_img[i][j + 1][2];
        avg_alpha += condensed_img[i][j + 1][3];

        if (up) {
            total++;
            avg_red += condensed_img[i - 1][j + 1][0];
            avg_green += condensed_img[i - 1][j + 1][1];
            avg_blue += condensed_img[i - 1][j + 1][2];
            avg_alpha += condensed_img[i - 1][j + 1][3];
        }

        if (down) {
            total++;
            avg_red += condensed_img[i + 1][j + 1][0];
            avg_green += condensed_img[i + 1][j + 1][1];
            avg_blue += condensed_img[i + 1][j + 1][2];
            avg_alpha += condensed_img[i + 1][j + 1][3];
        }
    }

    if (up) {
        total++;
        avg_red += condensed_img[i - 1][j][0];
        avg_green += condensed_img[i - 1][j][1];
        avg_blue += condensed_img[i - 1][j][2];
        avg_alpha += condensed_img[i - 1][j][3];
    }

    if (down) {
        total++;
        avg_red += condensed_img[i + 1][j][0];
        avg_green += condensed_img[i + 1][j][1];
        avg_blue += condensed_img[i + 1][j][2];
        avg_alpha += condensed_img[i + 1][j][3];
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
        sum += Math.pow(v1[i] - v2[i], 2);
    }
    Math.sqrt(sum);
    return sum;
}


var convert_final = function() {
    var ctx = output_pix.getContext("2d");
    imgData = ctx.createImageData(leaf_contrast[0].length, leaf_contrast.length);
    output_pix.style.height='1200px';
    output_pix.style.width = '1600px';
    //imgData = ctx.createImageData(imgd);
    
    var max = 0;
    var avg = 0
    for (var i = 0; i < leaf_contrast.length; i++) {
        for (var j = 0; j < leaf_contrast[0].length; j++) {
            if (leaf_contrast[i][j] > max) {
                max = leaf_contrast[i][j];
            }
            avg += leaf_contrast[i][j] / (leaf_contrast.length * leaf_contrast[0].length);
        }
    }
    console.log(max, avg);

    count = 0;
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            
            if (leaf_contrast[i][j] >= 1) {
                imgData.data[count] = 255;
            } else {
                imgData.data[count] = 0;
            }
            //imgData.data[count] = Math.pow(2, max - leaf_contrast[i][j]);
            imgData.data[count + 1] = 0;
            imgData.data[count + 2] = 0;
            imgData.data[count + 3] = 255;
            count += 4;
        }
    }
    ctx.putImageData(imgData, 0, 0);
  //  document.getElementsByTagName("body")[0].append(output_pix);
}

var contrasts = new Array(10);

for (THECOUNT = 1; THECOUNT <= 1; THECOUNT++) {
     canvas = document.createElement('canvas');
     output_pix = document.createElement('canvas');
    //var output_pix = document.getElementById("myCanvas");

     img = new Image();
    img.src = "leaf" + THECOUNT + ".png" //Relative directory of the image
    img.onload = function() {
        width = img.width;
        height = img.height;
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
        imgd = canvas.getContext('2d').getImageData(0, 0, width, height);
        pix = imgd.data;
        
        split_img();
        //avg_pixels();

        //convert_final();
    }
}
//document.getElementsByTagName("body")[0].append(canvas);
