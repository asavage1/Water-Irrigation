var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
function previewFile() {
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.addEventListener("load", function (e) {
  	    var img = new Image();
        img.onload = function() {
        context.drawImage(img, 0, 0);
    };
    img.src = e.target.result;
    preview.src = reader.result;
  }, false);
}
