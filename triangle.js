;(function(window) {
    var Utils = window.Utils;
    function draw() {
        var canvas = document.getElementById('canvas');
        var gl = canvas.getContext('experimental-webgl');

        var vertexPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);

        var vertices = [-0.5, -0.5, 0.5, -0.5, 0, 0.5];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        var vs = document.getElementById('vertex').textContent;
        var fs = document.getElementById('fragment').textContent;
        var program = Utils.createProgram(gl, vs, fs);
        gl.useProgram(program);

        var vertexPosAttrib = gl.getAttribLocation(program, 'pos');
        gl.enableVertexAttribArray(vertexPosAttrib);
        gl.vertexAttribPointer(vertexPosAttrib, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    window.Triangle = {
        draw: draw
    };
})(window);
