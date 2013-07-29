;(function(window) {
    /**
     * Wrapper around some vertices
     */
    function Geometry(data) {
        if(data) {
            this.data = data;
        } else {
            this.data = [];
        }
    }

    /**
     * Apply this matrix to all vertices in the geometry
     */
    Geometry.prototype.transform = function(mat) {
        this.data.forEach(function(vtx) {
            vec4.transformMat4(vtx, vtx, mat);
        });
        return this;
    };

    /**
     * Return this Geometry's vertices, in one Float32Array
     */
    Geometry.prototype.flatten = function() {
        var res = new Float32Array(this.data.length * 4);
        for(var i = 0; i < this.data.length; i++) {
            res.set(this.data[i], i * 4);
        }
        return res;
    };

    Geometry.prototype.clone = function() {
        var res = [];
        this.data.forEach(function(vtx) {
            res.push(vec4.clone(vtx));
        });
        return new Geometry(res);
    };

    Geometry.prototype.union = function() {
        var res = [];
        function p(vtx) {
            res.push(vec4.clone(vtx));
        }
        this.data.forEach(p);
        for(var i = 0; i < arguments.length; i++) {
            arguments[i].data.forEach(p);
        }
        return new Geometry(res);
    };

    Geometry.prototype.count = function() {
        return this.data.length;
    };

    function rectangle(x, y, w, h) {
        return new Geometry([
            vec4.fromValues(x,   y,   0, 1),
            vec4.fromValues(x+w, y,   0, 1),
            vec4.fromValues(x,   y+h, 0, 1),
            vec4.fromValues(x,   y+h, 0, 1),
            vec4.fromValues(x+w, y,   0, 1),
            vec4.fromValues(x+w, y+h, 0, 1)
        ]);
    }

    function lineSquare() {
        var left = rectangle(0, 0, 3, 50);
        var top = left.clone();

        var rotate = mat4.create();
        rotate = mat4.rotateZ(rotate, rotate, -Math.PI/2);
        var translate = mat4.create();
        translate = mat4.translate(translate, translate, vec4.fromValues(0, 3, 0, 1));

        top.transform(rotate);
        top.transform(translate);

        var bot = top.clone();
        translate = mat4.translate(translate, mat4.create(), vec4.fromValues(0, 47, 0, 1));
        bot.transform(translate);

        var right = left.clone();
        right.transform(mat4.translate(mat4.create(), mat4.create(), vec4.fromValues(47, 0, 0, 1)));

        var square = right.union(bot, left, top);
        return square;
    }

    window.Geometry = Geometry;
    window.rectangle = rectangle;
    window.lineSquare = lineSquare;

})(window);
