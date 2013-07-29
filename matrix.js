/**
 * tiny, naive matrix library
 */
;(function(exports) {
    function Matrix4(data) {
        if(data) {
            this.data = data;
        } else {
            this.data = [
                0, 0, 0, 0
                ,0, 0, 0, 0
                ,0, 0, 0, 0
                ,0, 0, 0, 0
            ];
        }
    }
    Matrix4.prototype.toString = function() {
        var res = '';
        for(var i = 0; i < 15; i+=4) {
            res += this.data.slice(i, i+4).join(' ');
            if(i !== 12) {
                res += '\n';
            }
        }
        return res;
    };
    Matrix4.prototype.add = function(that) {
        var res = new Matrix4();
        if(that instanceof Matrix4) {
            for(var i = 0; i < 16; i++) {
                res.data[i] = this.data[i] + that.data[i];
            }
            return res;
        } else if (typeof that === 'number') {
            for(var j = 0; j < 16; j++) {
                res.data[j] = this.data[j] + that;
            }
            return res;
        } else {
            throw new Error('Matrix4.add expected Number or other Matrix4');
        }
    };
    Matrix4.prototype.sub = function(that) {
        var res = new Matrix4();
        if(that instanceof Matrix4) {
            for(var i = 0; i < 16; i++) {
                res.data[i] = this.data[i] - that.data[i];
            }
            return res;
        } else if (typeof that === 'number') {
            for(var j = 0; j < 16; j++) {
                res.data[j] = this.data[j] - that;
            }
            return res;
        } else {
            throw new Error('Matrix4.sub expected Number or other Matrix4');
        }
    };
    Matrix4.prototype.mul = function(that) {
        var res = new Matrix4();
        if(that instanceof Matrix4) {
            for(var i = 0; i < 4; i++) {
                for(var j = 0; j < 4; j++) {
                    for(var k = 0; k < 4; k++) {
                        res.data[i + j*4] += this.data[i + k*4] * that.data[k + j*4];
                    }
                }
            }
            return res;
        } else if(that.constructor === Number) {
            for(var l = 0; l < 16; l++) {
                res.data[l] = this.data[l] * that;
            }
            return res;
        } else {
            throw new Error('Matrix4.mul expected Number or other Matrix4');
        }
    };
    function identity() {
        return new Matrix4([
            1, 0, 0, 0
           ,0, 1, 0, 0
           ,0, 0, 1, 0
           ,0, 0, 0, 1
        ]);
    }
    function random() {
        var res = new Matrix4();
        for(var i = 0; i < 16; i++) {
            res.data[i] = Math.floor(Math.random() * 100);
        }
        return res;
    }
    function trans(x, y, z) {
        return new Matrix4([
            1, 0, 0, 0
           ,0, 1, 0, 0
           ,0, 0, 1, 0
           ,x, y, z, 1
        ]);
    }
    function rotX(theta) {
        var c = Math.cos(theta);
        var s = Math.sin(theta);
        return new Matrix4([
            1, 0,  0, 0
           ,0, c, -s, 0
           ,0, s,  c, 0
           ,0, 0,  0, 1
        ]);
    }
    function rotY(theta) {
        var c = Math.cos(theta);
        var s = Math.sin(theta);
        return new Matrix4([
             c, 0, s, 0
           , 0, 1, 0, 0
           ,-s, 0, c, 0
           , 0, 0, 0, 1
        ]);
    }
    function rotZ(theta) {
        var c = Math.cos(theta);
        var s = Math.sin(theta);
        return new Matrix4([
             c, -s, 0, 0
            ,s,  c, 0, 0
            ,0,  0, 1, 0
           , 0,  0, 0, 1
        ]);
    }
    function scale(x, y, z) {
        return new Matrix4([
            x, 0, 0, 0
           ,0, y, 0, 0
           ,0, 0, z, 0
           ,0, 0, 0, 1
        ]);
    }
    function proj(w, h, d) {
        return new Matrix4([
            2/w, 0,   0,   0,
            0,  -2/h, 0,   0,
            0,   0,   2/w, 0,
           -1,   1,   0,   1
        ]);
    }

    function persp(fov, aspect, near, far) {
        var f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
        var rangeInv = 1.0 / (near - far);
        return new Matrix4([
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (near + far) * rangeInv, -1,
            0, 0, near * far * rangeInv * 2, 0
        ]);
    }

    exports.Matrix4 = Matrix4;
    exports.identity = identity;
    exports.random = random;
    exports.trans = trans;
    exports.rotX = rotX;
    exports.rotY = rotY;
    exports.rotZ = rotZ;
    exports.scale = scale;
    exports.proj = proj;
    exports.persp = persp;
})(typeof exports === 'undefined' ? window : exports);
