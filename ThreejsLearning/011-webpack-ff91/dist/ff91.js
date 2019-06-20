define(["require", "exports", "tslib", "./shader/head_light_frag.glsl", "./shader/head_light_vert.glsl"], function (require, exports, tslib_1, head_light_frag_glsl_1, head_light_vert_glsl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    head_light_frag_glsl_1 = tslib_1.__importDefault(head_light_frag_glsl_1);
    head_light_vert_glsl_1 = tslib_1.__importDefault(head_light_vert_glsl_1);
    var Control = /** @class */ (function () {
        function Control() {
            console.error(head_light_frag_glsl_1.default, head_light_vert_glsl_1.default, 'aaa1');
        }
        return Control;
    }());
    exports.Control = Control;
});
//# sourceMappingURL=ff91.js.map