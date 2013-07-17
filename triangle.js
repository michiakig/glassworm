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
    var x=0, y=0, rx=0, ry=0, rz=0;

    function handle(evt) {
        switch(evt.keyCode) {
            case 37: x-=10; break;
            case 38: y-=10; break;
            case 39: x+=10; break;
            case 40: y+=10; break;

            case 74: rx+=10; break;
            case 75: rx-=10; break;

            case 78: ry+=10; break;
            case 77: ry-=10; break;

            case 85: rz+=10; break;
            case 73: rz-=10; break;

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
        p = p.mul(rotX(rx * Math.PI / 180));
        p = p.mul(rotY(ry * Math.PI / 180));
        p = p.mul(rotZ(rz * Math.PI / 180));
        var loc = gl.getUniformLocation(program, 'uproj');
        gl.uniformMatrix4fv(loc, false, new Float32Array(p.data));

        Utils.pushData(gl, [
            0,  0,   0,
           -50, 86.6, 50,
            50, 86.6, 50,

            0,  0,   0,
            50, 86.6, 50,
            0,  86.6,-50,

            0,  0,   0,
            0,  86.6,-50,
            -50,86.6, 50,

            0,  86.6,-50,
            -50,86.6, 50,
            50, 86.6, 50
        ]);
        Utils.updateAttrib(gl, program, 'pos', 3);

        Utils.pushData(gl, [
            0.8, 0.8, 0, 1,
            0.8, 0.8, 0, 1,
            0.8, 0.8, 0, 1,

            0, 0.8, 0.8, 1,
            0, 0.8, 0.8, 1,
            0, 0.8, 0.8, 1,

            0.8, 0, 0.8, 1,
            0.8, 0, 0.8, 1,
            0.8, 0, 0.8, 1,

            1, 0, 0, 1,
            1, 0, 0, 1,
            1, 0, 0, 1
        ]);
        Utils.updateAttrib(gl, program, 'acolor', 4);

        gl.drawArrays(gl.TRIANGLES, 0, 12);
    }

    window.Triangle = {
        main: main,
        draw: draw
    };
})(window);
