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

        var triangles1 = [
            50, 0, 0,
            0, 100, 0,
            100, 100, 0
        ];

        var triangles2 = [
            150, 0, 0,
            100, 100, 0,
            200, 100, 0
        ];

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangles1), gl.STATIC_DRAW);

        loc = gl.getAttribLocation(program, 'pos');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 3);

        var buffer2 = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer2);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangles2), gl.STATIC_DRAW);

        loc = gl.getAttribLocation(program, 'pos');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);

        // p = proj(canvas.width*2, canvas.height*2, canvas.width*2);
        // loc = gl.getUniformLocation(program, 'uproj');
        // gl.uniformMatrix4fv(loc, false, new Float32Array(p.data));

        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    window.main = main;
})(window);
