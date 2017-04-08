//bestFit.js
//Elias Marcopoulos and Andrew Savage

//contrasts = array indexed from 0 to 9
//avg is city heatmap

var find_fit = function(map1, map2) {
    var m1h = map1.length;
    var m1w = map1[0].length;
    var m2h = map2.length;
    var m2h = map2[0].length;

    
    
}

var euc_dist_pt = function(v1, v2) {
    sum = 0;
    for (var i = 0; i < v1.length; i++) {
        sum += Math.pow(v1 - v2, 2);
    }
    sum = Math.sqrt(sum);
}


fit = -1;
fit_index = -1;
for (var leaf_ind = 0; leaf_ind < 10; leaf_ind++) {
    var curr_con = contrasts[leaf_ind];
    var leaf_h = curr_con.height;
    var leaf_w = curr_con.width;
    var curr_city = avg
    var city_h = curr_city.height;
    var city_w = curr_city.width;
    
    tfit = find_fit(contrasts[leaf_ind], avg);
    if (tfit > fit) {
        fit = tfit;
        fit_index = leaf_ind;
    }
}
