document.getElementById('city').addEventListener('change', readURL, true);
function readURL(){
    file = document.getElementById("city").files[0];
    reader = new FileReader();
   reader.onloadend = function(){
//   document.getElementById('clock').style.backgroundImage = "url(" + reader.result + ")";
}
   if(file){
       console.log(reader.readAsDataURL(file));
    }else{
    }
}
