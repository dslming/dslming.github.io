"use strict";
define("AssetLoader", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var THREE = window.THREE;
    var Cargo = /** @class */ (function () {
        function Cargo() {
            this.mesh = {};
        }
        Cargo.prototype.addAsset = function (name, asset) {
            if (this.mesh[name] === undefined) {
                this.mesh[name] = asset;
                return true;
            }
            return false;
        };
        Cargo.prototype.getMesh = function (name) {
            return this.mesh[name] !== undefined ? this.mesh[name] : null;
        };
        Cargo.prototype.getTexture = function (name) {
            return this.mesh[name] !== undefined ? this.mesh[name] : null;
        };
        Cargo.prototype.getCubeTexture = function (name) {
            return this.mesh[name] !== undefined ? this.mesh[name] : null;
        };
        return Cargo;
    }());
    var AssetLoader = /** @class */ (function () {
        function AssetLoader(_path, _manifesto, _callback) {
            this.path = _path;
            this.manifesto = _manifesto;
            this.callback = _callback;
            this.language = document.location.href.indexOf('/us') > -1 ? 'us' : 'cn';
            this.cargo = new Cargo();
            this.assetCount = 0;
            this.assetTotal = _manifesto.length;
            this.loaderText = new THREE.TextureLoader();
            this.loaderMesh = new THREE.ObjectLoader();
            this.loaderCube = new THREE.CubeTextureLoader();
            this.container = document.getElementById('preloader');
            this.progBar = document.getElementById('preProg');
            this.detailBox = document.getElementById('preDetail');
        }
        AssetLoader.prototype.start = function () {
            var _this = this;
            this.container && (this.container.className = 'visible');
            if (this.language === 'us') {
                this.detailBox && (this.detailBox.innerHTML = 'Loading assets');
            }
            else {
                this.detailBox && (this.detailBox.innerHTML = '加载中');
            }
            var ext;
            var _loop_1 = function (i) {
                ext = '.' + this_1.manifesto[i].ext;
                switch (this_1.manifesto[i].type) {
                    case 'texture':
                        this_1.loaderText.load(this_1.path + 'textures/' + this_1.manifesto[i].name + ext, function (_obj) {
                            _this.assetAquired(_obj, _this.manifesto[i].name);
                        }, undefined, function (_err) {
                            _this.assetFailed(_err, _this.manifesto[i].name);
                        });
                        break;
                    case 'mesh':
                        this_1.loaderMesh.load(this_1.path + 'meshes/' + this_1.manifesto[i].name + '.json', function (_obj) {
                            _this.assetAquired(_obj, _this.manifesto[i].name);
                        }, undefined, function (_err) {
                            _this.assetFailed(_err, _this.manifesto[i].name);
                        });
                        break;
                    case 'cubetexture':
                        this_1.loaderCube.setPath(this_1.path + 'textures/' + this_1.manifesto[i].name + '/');
                        this_1.loaderCube.load([
                            'xp' + ext,
                            'xn' + ext,
                            'yp' + ext,
                            'yn' + ext,
                            'zp' + ext,
                            'zn' + ext
                        ], function (_obj) {
                            _this.assetAquired(_obj, _this.manifesto[i].name);
                        }, undefined, function (_err) {
                            _this.assetFailed(_err, _this.manifesto[i].name);
                        });
                        break;
                }
            };
            var this_1 = this;
            for (var i = 0; i < this.assetTotal; i++) {
                _loop_1(i);
            }
        };
        AssetLoader.prototype.remove = function () {
            this.container && (this.container.className = '');
        };
        AssetLoader.prototype.assetAquired = function (_obj, _name) {
            this.cargo.addAsset(_name, _obj);
            this.assetCount++;
            this.pct = this.assetCount / this.assetTotal;
            this.progBar && (this.progBar.style.width = this.pct * 100 + '%');
            if (this.assetCount == this.assetTotal) {
                this.complete();
            }
        };
        AssetLoader.prototype.assetFailed = function (_err, _name) {
            this.assetCount++;
            this.pct = this.assetCount / this.assetTotal;
            if (this.assetCount == this.assetTotal) {
                this.complete();
            }
        };
        AssetLoader.prototype.complete = function () {
            this.container && (this.container.classList.remove('visible'));
            this.callback(this.cargo);
        };
        return AssetLoader;
    }());
    exports.default = AssetLoader;
});
define("shader/head_light_frag.glsl", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "\n#define RED vec3(1.0, 0.1, 0.1) // red\n#define AMB vec3(1.0, 0.6, 0.1)\t// amber\n#define WHT vec3(1.0, 1.0, 1.0)\t// white\n\nvarying float wht;\nvarying float amb;\n\nvoid main() {\n\tgl_FragColor = vec4((WHT * wht + AMB * amb), 1.0);\n}\n";
});
define("shader/head_light_vert.glsl", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "\nfloat normFloat(float n, float minVal, float maxVal){\n\treturn max(0.0, min(1.0, (n-minVal) / (maxVal-minVal)));\n}\n\n// Returns 1 if type matches val, 0 if not\nfloat checkType(float type, float val){\n\treturn step(val - 0.1, type) * step(type, val + 0.1);\n}\n // \u5149\u7684\u5F00\u5173\nuniform vec3 lightsT;\t// Lights Turn | x: anyTurn, y: left turn, z: right turn\n// \u5149\u7684\u5F3A\u5EA6\nuniform vec4 lightsS;\t// Lights Stat | x: daytime, y: loBeams, z: hiBeams, w: fogs\nattribute float type;\nvarying float wht;\nvarying float amb;\n\n// z-up position because Blender is weird like that\nvoid main() {\n\tvec2 posXY = vec2(position.y - 2299.0, position.z - 1355.0);\n\tfloat distOrigin = distance(posXY, vec2(0.0));   // FF Logo\n\n\t// 0: Daytime running lights\n\twht = checkType(type, 0.0) * lightsS.x;\n\t\n\t// 1: nightlights\n\twht += checkType(type, 1.0) * lightsS.y;\n\t\n\t// 2: high beams\n\twht += checkType(type, 2.0) * lightsS.z;\n\t\n\t// 3: right turn signal\n\twht += checkType(type, 3.0) * (1.0 + lightsT.x) * lightsS.x;\n\tamb = checkType(type, 3.0) * lightsT.z;\n\t\n\t// 4: left turn signal\n\twht += checkType(type, 4.0) * (1.0 - lightsT.x) * lightsS.x;\n\tamb += checkType(type, 4.0) * lightsT.y;\n\n\t// 5: fog lamps\n\twht += checkType(type, 5.0) * lightsS.w;\n\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );\n}\n";
});
define("ff91", ["require", "exports", "tslib", "AssetLoader"], function (require, exports, tslib_1, AssetLoader_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AssetLoader_1 = tslib_1.__importDefault(AssetLoader_1);
    var THREE = window.THREE;
    var Control = /** @class */ (function () {
        function Control() {
            // 资源加载
            var manifesto = [
                // Cube textures
                { name: "envReflection", type: "cubetexture", ext: "jpg" },
                { name: "envSkybox", type: "cubetexture", ext: "jpg" },
                // Car lights
                { name: "flareHead", type: "texture", ext: "jpg" },
                { name: "flareTurn", type: "texture", ext: "jpg" },
                { name: "lightTurn", type: "texture", ext: "jpg" },
                { name: "lightStop", type: "texture", ext: "jpg" },
                // Car geometry
                { name: "body", type: "mesh", ext: "json" },
                { name: "wheel", type: "mesh", ext: "json" },
                { name: "xrays", type: "mesh", ext: "json" },
                // Car textures
                { name: "thread", type: "texture", ext: "jpg" },
                { name: "shadow", type: "texture", ext: "jpg" },
                { name: "led", type: "texture", ext: "png" },
            ];
            this.assetLoader = new AssetLoader_1.default("./static/", manifesto, function () { console.error('load over...'); });
            this.assetLoader.start();
            // 场景
            this.sceneWGL = new THREE.Scene();
            this.sceneWGL.name = 'sceneWGL';
            // 渲染
            this.vp = new THREE.Vector2(window.innerWidth, window.innerHeight);
            this.sceneWGL.background = new THREE.Color(0x000000);
            this.rendererWGL = new THREE.WebGLRenderer({ antialias: true });
            this.rendererWGL.setSize(this.vp.x, this.vp.y);
            this.continer = document.getElementById("GLCanvas");
            this.continer.appendChild(this.rendererWGL.domElement);
        }
        return Control;
    }());
    exports.Control = Control;
});
//# sourceMappingURL=ff91.js.map