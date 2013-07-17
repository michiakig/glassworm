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
    var x=150, y=150, rx=0, ry=0, rz=0;
    var program;

    var colors = [].concat(
            makeColors(6),
            makeColors(6),
            makeColors(6),
            makeColors(6),
            makeColors(6),
            makeColors(6)
        );

    var geo = [
            // front side
            0,  50, 0,
            0,  0,  0,
            50, 50, 0,

            50, 50, 0,
            0,  0,  0,
            50, 0,  0,

            // right side
            50, 50,  0,
            50, 0,   0,
            50, 50, -50,

            50, 50, -50,
            50, 0,   0,
            50, 0,  -50,

            // back side
            50, 50, -50,
            50,  0, -50,
            0,  50, -50,

            0,  50, -50,
            50, 0, -50,
            0,  0, -50,

            // left side
            0,  50, -50,
            0,  0,  -50,
            0,  50,   0,

            0,  50,  0,
            0,  0,  -50,
            0,  0,   0,

            // top side
            0,  0,  0,
            0,  0, -50,
            50,  0, 0,

            50, 0, 0,
            0,  0, -50,
            50, 0, -50,

            // bottom side
            0,  50, -50,
            0,  50,  0,
            50, 50, -50,

            50, 50, -50,
            0,  50,  0,
            50, 50,  0
        ].map(function(x) {return x-25;});

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
        gl.enable(gl.CULL_FACE);
//        document.body.addEventListener('keydown', handle);

        // set up shaders
        var vs = document.getElementById('vertex').textContent;
        var fs = document.getElementById('fragment').textContent;
        program = Utils.createProgram(gl, vs, fs);
        gl.useProgram(program);

        draw();
    }

    function randColor() {
        var r = Math.random();
        var g = Math.random();
        var b = Math.random();
        return [r,g,b,1];
    }

    function makeColors(n) {
        var c = randColor();
        var res = [];
        for(var i = 0; i < n; i++) {
            res = res.concat(c);
        }
        return res;
    }

    var p = proj(canvas.width, canvas.height, canvas.width).mul(trans(x, y, 0));
    function draw() {
        requestAnimationFrame(draw);

        rx+=1;
        ry+=1;
        rz+=1;

        p = p.mul(rotX(rx * Math.PI / 180));
        p = p.mul(rotY(ry * Math.PI / 180));
        p = p.mul(rotZ(rz * Math.PI / 180));
        var loc = gl.getUniformLocation(program, 'uproj');
        gl.uniformMatrix4fv(loc, false, new Float32Array(p.data));

        Utils.pushData(gl, geo);
        Utils.updateAttrib(gl, program, 'pos', 3);

        Utils.pushData(gl, colors);
        Utils.updateAttrib(gl, program, 'acolor', 4);

        gl.drawArrays(gl.TRIANGLES, 0, 36);
    }

    window.Demo = {
        main: main,
        draw: draw
    };
})(window);
