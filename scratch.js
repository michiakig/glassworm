;(function(window) {
    function main() {
        var canvas = document.getElementById('canvas');
        var gl = canvas.getContext('experimental-webgl');

        // prepare shader code
        var vs = document.getElementById('vertex').textContent;
        var fs = document.getElementById('fragment').textContent;
        var program = Utils.createProgram(gl, vs, fs);
        gl.useProgram(program);

        var p = proj(canvas.width, canvas.height, canvas.width);
        var loc = gl.getUniformLocation(program, 'uproj');
        gl.uniformMatrix4fv(loc, false, new Float32Array(p.data));

        var s = 50;

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, geo, gl.STATIC_DRAW);

        loc = gl.getAttribLocation(program, 'pos');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, geo.length / 3);
    }
    window.main = main;
})(window);
