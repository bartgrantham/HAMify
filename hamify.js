function HAMify(img, canvas) {
    var w = img.width, h = img.height;
    var ctx = canvas.getContext("2d");

    canvas.width = img.width;  canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    var canvaspixels = ctx.getImageData(0, 0, w, h);
    HAM_min_error(w, h, canvaspixels);
    ctx.putImageData(canvaspixels, 0, 0);
    $(img).hide();  $(canvas).show();
    //$(canvas).show();
}

function HAM_min_error(w, h, pixels) {
    var r, g, b, quantize = 0xF0;
    // noise is an important algorithmic tie-breaker if all colors are equally bad
    var noise = function(){  return (Math.random()-.5)*.0025;  };
    var pixelstate = [pixels.data[0], pixels.data[1], pixels.data[2]]
    for(var y=0; y<h; y++) {
        for(var x=0; x<w; x++) {
            i = ((y*w)+x)*4;
            r = pixels.data[i] &= quantize;
            g = pixels.data[i+1] &= quantize;
            b = pixels.data[i+2] &= quantize;
            diff = [
                Math.abs(r-pixelstate[0]) + noise(),
                Math.abs(g-pixelstate[1]) + noise(),
                Math.abs(b-pixelstate[2]) + noise()
            ];
            if ( (diff[0] > diff[1]) && (diff[0] > diff[2]) ) {
                // Red is greatest difference, hold over green and blue
                pixels.data[i+1] = pixelstate[1];
                pixels.data[i+2] = pixelstate[2];
                pixelstate[0] = r;
            } else if ( (diff[1] > diff[0]) && (diff[1] > diff[2]) ) {
                // Green is greatest difference, hold over red and blue
                pixels.data[i+0] = pixelstate[0];
                pixelstate[1] = g;
                pixels.data[i+2] = pixelstate[2];
            } else {
                // Blue is greatest difference, hold over red and green
                pixels.data[i+0] = pixelstate[0];
                pixels.data[i+1] = pixelstate[1];
                pixelstate[2] = b;
            }
        }
    }
}

