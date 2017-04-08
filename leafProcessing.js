// script.js
// Andrew Savage and Elias Marcopoulos

//constants:
var split_size = 64;


var img = new Image();
img.src = "" //Relative directory of the image

var width = img.width;
var height = img.height;

var condensed_img = []

for (var l = 0; l < height; l += split_size) {
    array_ind = 0
    condensed_img.push([]);
    
    cur_height = Math.min(l + split_size, height);

    for (var k = 0; k < width; k += 4 * split_size) {
        cur_width = Math.min(k + 4 * split_size, width);
        var avg_red = 0;
        var avg_green = 0;
        var avg_blue = 0;
        var avg_alpha = 0;

        for (var j = l; j < cur_height; j++) {
            for (var i = k; i < cur_width; i+= 4) {
                avg_red += img[i] / (cur_width * cur_height);
                avg_green += img[i + 1] / (cur_width * cur_height);
                avg_blue = img[i + 2] / (cur_width * cur_height);
                avg_alpha = data[i + 3] / (cur_width * cur_height);
            }
        }
        
        condensed_img[array_ind].push((avg_red, avg_green, avg_blue, avg_alpha));
        array_ind ++;


            }
        }
    }
    condensed_img[
}
