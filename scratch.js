;(function(window) {
    function main() {
        // get gl context
        var canvas = document.getElementById('canvas');
        var gl = canvas.getContext('experimental-webgl', {preserveDrawingBuffer: true});

        // prepare shader code
        var vs = document.getElementById('vertex').textContent;
        var fs = document.getElementById('fragment').textContent;
        var program = Utils.createProgram(gl, vs, fs);
        gl.useProgram(program);

        var p = proj(canvas.width, canvas.height, canvas.width);
        var loc = gl.getUniformLocation(program, 'uproj');
        gl.uniformMatrix4fv(loc, false, new Float32Array(p.data));

        var triangles = [
            50, 0, 0,
            0, 100, 0,
            100, 100, 0,

            300, 400, 0,
            350, 300, 0,
            400, 400, 0
        ];

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangles), gl.STATIC_DRAW);

        loc = gl.getAttribLocation(program, 'pos');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 3);

        p = proj(canvas.width*2, canvas.height*2, canvas.width*2);
        loc = gl.getUniformLocation(program, 'uproj');
        gl.uniformMatrix4fv(loc, false, new Float32Array(p.data));

        gl.drawArrays(gl.TRIANGLES, 3, 3);
    }
    window.main = main;
})(window);
