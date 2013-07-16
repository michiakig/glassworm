;(function(window) {
    /**
     * Given a WebGl context, shader source and either VERTEX_SHADER or FRAGMENT_SHADER, compile the shader and return it
     */
    function createShader(gl, src, type) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(shader));
        }
        return shader;
    }

    /**
     * Given a WebGl context, vertex shader source and fragment shader source, return a shader program
     */
    function createProgram(gl, vsrc, fsrc) {
        var program = gl.createProgram();
        var vshader = createShader(gl, vsrc, gl.VERTEX_SHADER);
        var fshader = createShader(gl, fsrc, gl.FRAGMENT_SHADER);
        gl.attachShader(program, vshader);
        gl.attachShader(program, fshader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(gl.getProgramInfoLog(program));
        }
        return program;
    }

    window.Utils = {
        createShader: createShader
       ,createProgram: createProgram
    };
})(window);
