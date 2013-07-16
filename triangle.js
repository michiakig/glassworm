;(function(window) {
    var Utils = window.Utils;
    function draw() {
        var canvas = document.getElementById('canvas');
        var gl = canvas.getContext('experimental-webgl');

        // set up shaders
        var vs = document.getElementById('vertex').textContent;
        var fs = document.getElementById('fragment').textContent;
        var program = Utils.createProgram(gl, vs, fs);
        gl.useProgram(program);

       // var p = proj(canvas.width, canvas.height, canvas.width);
       // var loc = gl.getUniformLocation(program, 'uproj');
       // gl.uniformMatrix4fv(loc, false, new Float32Array(p.data));

//        Utils.pushData(gl, [100, 300, 300, 300, 200, 100]);
        Utils.pushData(gl, [-0.5, -0.5, 0.5, -0.5, 0, 0.5]);
        Utils.updateAttrib(gl, program, 'pos', 2);

        Utils.pushData(gl, [
            1, 0, 0, 1,
            0, 1, 0, 1,
            0, 0, 1, 1
        ]);
        Utils.updateAttrib(gl, program, 'acolor', 4);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    window.Triangle = {
        draw: draw
    };
})(window);
