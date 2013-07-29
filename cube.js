;(function(window) {
    var Utils = window.Utils;

    var requestAnimationFrame =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    var canvas, gl;
    var x=150, y=150, z=0, rx=0, ry=0, rz=0;
    var program;
    var projection;

    var cube = new Geometry([
        // front
        [0,  50, 0, 1],
        [0,  0,  0, 1],
        [50, 50, 0, 1],

        [50, 50, 0, 1],
        [0,  0,  0, 1],
        [50, 0,  0, 1],

        // right
        [50, 50,  0, 1],
        [50, 0,   0, 1],
        [50, 50, -50, 1],

        [50, 50, -50, 1],
        [50, 0,   0, 1],
        [50, 0,  -50, 1],

        // back
        [50, 50, -50, 1],
        [50,  0, -50, 1],
        [0,  50, -50, 1],

        [0,  50, -50, 1],
        [50, 0, -50, 1],
        [0,  0, -50, 1],

        // left
        [0,  50, -50, 1],
        [0,  0,  -50, 1],
        [0,  50,   0, 1],

        [0,  50,  0, 1],
        [0,  0,  -50, 1],
        [0,  0,   0, 1],

        // top
        [0,  0,  0, 1],
        [0,  0, -50, 1],
        [50,  0, 0, 1],

        [50, 0, 0, 1],
        [0,  0, -50, 1],
        [50, 0, -50, 1],

        // bottom
        [0,  50, -50, 1],
        [0,  50,  0, 1],
        [50, 50, -50, 1],

        [50, 50, -50, 1],
        [0,  50,  0, 1],
        [50, 50,  0, 1]
    ].map(function(arr) { return vec4.fromValues.apply(vec4, arr); }));

    var translations = [
        vec3.fromValues(100, 0, 0),
        vec3.fromValues(0, 100, 0),
        vec3.fromValues(0, 0, 100),

        vec3.fromValues(-100, 0, 0),
        vec3.fromValues(0, -100, 0),
        vec3.fromValues(0, 0, -100)
    ];

    var cube1, t, geo = cube;
    for(var i = 0; i < translations.length; i++) {
        cube1 = cube.clone();
        t = mat4.create();
        mat4.translate(t, t, translations[i]);
        cube1.transform(t);
        geo = geo.union(cube1);
    }

    function handle(evt) {
        switch(evt.keyCode) {
            case 37: /* left */  break;
            case 38: /* up */    z+=10; break;
            case 39: /* right */ break;
            case 40: /* down  */ z-=10; break;

            default: break;
        }
    }

    function main() {
        canvas = document.getElementById('canvas');
        gl = canvas.getContext('experimental-webgl');
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        document.body.addEventListener('keydown', handle);

        // set up shaders
        var vs = document.getElementById('vertex').textContent;
        var fs = document.getElementById('fragment').textContent;
        program = Utils.createProgram(gl, vs, fs);
        gl.useProgram(program);

        projection = proj(canvas.width, canvas.height, canvas.width)
            .mul(trans(x, y, z));

        Utils.pushData(gl, geo.flatten());
        Utils.updateAttrib(gl, program, 'pos', 4);

        window.colors = [];
        for(var i = 0; i < geo.flatten().length; i++) {
            window.colors=window.colors.concat(randColor());
        }

        Utils.pushData(gl, window.colors);
        Utils.updateAttrib(gl, program, 'acolor', 4);

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

    function draw() {
        requestAnimationFrame(draw);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        rx+=1;
        ry+=1;
        rz+=1;
        
        var p = projection;
        p = p.mul(rotX(rx * Math.PI / 180));
        p = p.mul(rotY(ry * Math.PI / 180));
        p = p.mul(rotZ(rz * Math.PI / 180));
        var loc = gl.getUniformLocation(program, 'uproj');
        gl.uniformMatrix4fv(loc, false, new Float32Array(p.data));

        gl.drawArrays(gl.TRIANGLES, 0, geo.count());
    }

    window.Demo = {
        main: main,
        draw: draw
    };
})(window);
