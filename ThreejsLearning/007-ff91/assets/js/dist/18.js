module.exports = 'uniform vec3 lightsT;\nvarying float brightness;\nvarying vec2 vUV;\n\n// Normalizes a value between 0 - 1\nfloat normFloat(float n, float minVal, float maxVal){\n    return max(0.0, min(1.0, (n-minVal) / (maxVal-minVal)));\n}\n\nvoid main() {\n\tvUV = uv;\n    vec4 realPos = modelMatrix * vec4(position, 1.0);\n    vec3 realNorm = normalize(vec3(modelMatrix * vec4(normal, 0.0)));\n\n    vec3 lightVector = normalize(cameraPosition - realPos.xyz);\n    float diffuse = dot(realNorm, lightVector);\n    brightness = step(2000.0, position.y) * lightsT.z + step(position.y, 2000.0) * lightsT.y;\n    brightness *= normFloat(diffuse, 0.0, 0.5);\n\n    vec4 mvPosition = viewMatrix * realPos;\n    gl_Position = projectionMatrix * mvPosition;\n}';