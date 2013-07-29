;(function(window) {
    function drawRectangle(gl, program, color, x, y, w, h) {
        var geo = [  x,     y,     0,
                     x + w, y,     0,
                     x,     y + h, 0,
                     x + w, y + h, 0 ];
        Utils.pushData(gl, geo);
        Utils.updateAttrib(gl, program, 'pos', 3);

        Utils.pushData(gl, color);
        Utils.updateAttrib(gl, program, 'acolor', 4);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    function drawTriangle(gl, program, color, x, y) {
        var geo = [  0 + x,  0.5 + y, 0,
                  -0.5 + x, -0.5 + y, 0,
                   0.5 + x, -0.5 + y, 0 ];
        Utils.pushData(gl, geo);
        Utils.updateAttrib(gl, program, 'pos', 3);

        Utils.pushData(gl, color);
        Utils.updateAttrib(gl, program, 'acolor', 4);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function main() {
        var canvas = document.getElementById('canvas');
        var gl = canvas.getContext('experimental-webgl', {preserveDrawingBuffer: true});
        window.canvas = canvas;
        window.gl = gl;

        var vs = document.getElementById('vertex').textContent;
        var fs = document.getElementById('fragment').textContent;
        var program = Utils.createProgram(gl, vs, fs);
        window.program = program;
        gl.useProgram(program);

        var p = proj(canvas.width, canvas.height, canvas.width);
        var loc = gl.getUniformLocation(program, 'uproj');
        gl.uniformMatrix4fv(loc, false, new Float32Array(p.data));

        drawRectangle(gl, program, [0, 0.8, 0, 1,
                                    0, 0.8, 0, 1,
                                    0, 0.8, 0, 1,
                                    0, 0.8, 0, 1], 100, 100, 3, 50);
        drawRectangle(gl, program, [0, 0.8, 0, 1,
                                    0, 0.8, 0, 1,
                                    0, 0.8, 0, 1,
                                    0, 0.8, 0, 1], 100, 100, 50, 3);
        drawRectangle(gl, program, [0, 0.8, 0, 1,
                                    0, 0.8, 0, 1,
                                    0, 0.8, 0, 1,
                                    0, 0.8, 0, 1], 147, 100, 3, 50);
        drawRectangle(gl, program, [0, 0.8, 0, 1,
                                    0, 0.8, 0, 1,
                                    0, 0.8, 0, 1,
                                    0, 0.8, 0, 1], 100, 150, 50, 3);

    }
    window.main = main;
    window.drawTriangle = drawTriangle;
})(window);
