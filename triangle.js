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
    var x=0, y=0, r=0;

    function handle(evt) {
        switch(evt.keyCode) {
            case 37: x-=10; break;
            case 38: y-=10; break;
            case 39: x+=10; break;
            case 40: y+=10; break;

            case 74: r+=10; break;
            case 75: r-=10; break;

            default: console.log('handle:'+evt.keyCode); break;
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
        p = p.mul(trans(x, y, 0));
        p = p.mul(rotZ(r * Math.PI / 180));
        var loc = gl.getUniformLocation(program, 'uproj');
        gl.uniformMatrix4fv(loc, false, new Float32Array(p.data));

        Utils.pushData(gl, [0, 0, -50, 100, 50, 100]);
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
