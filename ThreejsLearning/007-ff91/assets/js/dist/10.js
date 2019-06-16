module.exports = 'float normFloat(float n, float minVal, float maxVal){\n\treturn max(0.0, min(1.0, (n-minVal) / (maxVal-minVal)));\n}\n\n// Returns 1 if type matches val, 0 if not\nfloat checkType(float type, float val){\n\treturn step(val - 0.1, type) * step(type, val + 0.1);\n}\n\nuniform vec3 lightsT;\t// Lights Turn | x: anyTurn, y: left turn, z: right turn\nuniform vec4 lightsS;\t// Lights Stat | x: daytime, y: loBeams, z: hiBeams, w: fogs\nattribute float type;\nvarying float wht;\nvarying float amb;\n\n// z-up position because Blender is weird like that\nvoid main() {\n\tvec2 posXY = vec2(position.y - 2299.0, position.z - 1355.0);\n\tfloat distOrigin = distance(posXY, vec2(0.0));   // FF Logo\n\n\t// 0: Daytime running lights\n\twht = checkType(type, 0.0) * lightsS.x;\n\t\n\t// 1: nightlights\n\twht += checkType(type, 1.0) * lightsS.y;\n\t\n\t// 2: high beams\n\twht += checkType(type, 2.0) * lightsS.z;\n\t\n\t// 3: right turn signal\n\twht += checkType(type, 3.0) * (1.0 + lightsT.x) * lightsS.x;\n\tamb = checkType(type, 3.0) * lightsT.z;\n\t\n\t// 4: left turn signal\n\twht += checkType(type, 4.0) * (1.0 - lightsT.x) * lightsS.x;\n\tamb += checkType(type, 4.0) * lightsT.y;\n\n\t// 5: fog lamps\n\twht += checkType(type, 5.0) * lightsS.w;\n\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );\n}';