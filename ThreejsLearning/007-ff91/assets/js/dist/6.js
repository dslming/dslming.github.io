module.exports = 'precision highp float;\n\nfloat normFloat(float n, float minVal, float maxVal){\n\treturn max(0.0, min(1.0, (n-minVal) / (maxVal-minVal)));\n}\n\nuniform vec3 cameraPosition;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform float progress;\n\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec3 offset;\nattribute float battID;\n\nvarying float brightness;\n\nvoid main() {\n\tfloat prog = normFloat(progress, battID, battID + 5.0);\n \tvec4 realPos = modelMatrix * vec4(offset + position * prog, 1.0);\n\tvec3 realNorm = normalize(vec3(modelMatrix * vec4(normal, 0.0)));\n\n\tvec3 lightVector = normalize(cameraPosition - realPos.xyz);\n\tbrightness = dot(realNorm, lightVector);\n\t// brightness = normFloat(brightness, 0.8, 0.3);\t// Front side\n\tbrightness = normFloat(-brightness, 0.8, 0.3);\t// Back side\n\tgl_Position = projectionMatrix * viewMatrix * realPos;\n}';