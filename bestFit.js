//bestFit.js
//Elias Marcopoulos and Andrew Savage

//contrasts = array indexed from 0 to 9
//avg is city heatmap

var find_centroid = function(map) {
    var centroid = [0,0,0]

    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            centroid[0] += i / (map.length * map[i].length);
            centroid[1] += j / (map.length * map[i].length);
            centroid[2] += map[i][j]/ (map.length * map[i].length);
        }
    }
    return centroid;
}

var sub_centr = function(map, vec) {
    var sub_map = []
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            sub_map.append([i - centroid[0], j - centroid[1], map[i][j] - centroid[2]]);
        }
    }
    return sub_map;
}

var find_perp = function(map) {
    var decomp = numeric.svd(map);
    //assume we found the least singular value in decomp
    var perp = decomp[0][0];
    return perp;
}

var fit_plane = function(map1) {
    var centroid = find_centroid(map1);
    var sub_map = sub_centr(map1, centroid);
    //May need to convert sub_map to numeric
    var perp = find_perp(sub_map);
    return perp;
}

var find_angle = function(v1, v2) {
    var num = v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
    var den1 = Math.sqrt(v1[0]*v1[0] + v1[1]*v1[1] + v1[2]*v1[2]);
    var den2 = Math.sqrt(v2[0]*v2[0] + v2[1]*v2[1] + v2[2]*v2[2]);
    return Math.acos(num / (den1 * den2));
        
}

var find_fit = function(map1, map2) {
    var p1 = fit_plane(map1);
    var p2 = fit_plane(map2);
    var angle = find_angle(p1, p2);
}


/*
var find_fit = function(map1, map2) {
    
    var dist = 0;
    for (var i = 0; i < Math.min(map1.length, map2.length)) {
        for (var j = 0; J < Math.min(map1[0].length, map2[0].length)) {
            dist += euc_dist_pt(map1[i][j], map2[i][j]);
        }
    }
    return dist;
}

var euc_dist_pt = function(v1, v2) {
    var sum = 0;
    for (var i = 0; i < v1.length; i++) {
        sum += Math.pow(v1 - v2, 2);
    }
    return Math.sqrt(sum);
}
*/

var best_fit = function() {
    fit = -1;
    fit_index = -1;
    for (var leaf_ind = 0; leaf_ind < 10; leaf_ind++) {
        tfit = find_fit(contrasts[leaf_ind], avg);
        if (tfit > fit) {
            fit = tfit;
            fit_index = leaf_ind;
        }
    }
    result(leaf_ind);
}
