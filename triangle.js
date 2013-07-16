;(function(window) {
    var Utils = window.Utils;

    var requestAnimationFrame =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    var canvas;
    var gl;
    var x=0, y=0;

    function handle(evt) {
        switch(evt.keyCode) {
            case 37: x--; break;
            case 38: y--; break;
            case 39: x++; break;
            case 40: y++; break;
        }
    }

    function main() {
        canvas = document.getElementById('canvas');
        gl = canvas.getContext('experimental-webgl');

        document.body.addEventListener('keydown', handle);
        draw();
    }

    function draw() {
        requestAnimationFrame(draw);

        // set up shaders
        var vs = document.getElementById('vertex').textContent;
        var fs = document.getElementById('fragment').textContent;
        var program = Utils.createProgram(gl, vs, fs);
        gl.useProgram(program);

        var p = proj(canvas.width, canvas.height, canvas.width);
        var loc = gl.getUniformLocation(program, 'uproj');
        gl.uniformMatrix4fv(loc, false, new Float32Array(p.data));

        Utils.pushData(gl, [100+x, 300+y, 300+x, 300+y, 200+x, 100+y]);
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
        main: main,
        draw: draw
    };
})(window);
