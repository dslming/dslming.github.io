attribute vec4 vPosition;
attribute vec4 vNormal;
varying vec4 fColor;
// 光的生产者
uniform vec4 ambientProduct, diffuseProduct, specularProduct;
// 模型视图矩阵
uniform mat4 modelViewMatrix;
// 透视矩阵
uniform mat4 projectionMatrix;
// 光的位置
uniform vec4 lightPosition;
// 光泽
uniform float shininess;
// 法线矩阵
uniform mat3 normalMatrix;

void main() {
    // 每个顶点的位置
    vec3 pos = (modelViewMatrix * vPosition).xyz;
    // 光的位置
    vec3 light = lightPosition.xyz;
    // 光的序列化后的位置
    vec3 L;
    if(lightPosition.w == 0.0) L = normalize(lightPosition.xyz);
    else L = normalize( lightPosition.xyz - pos );
    
    vec3 E = -normalize( pos );
    vec3 H = normalize( L + E );

    // Transform vertex normal into eye coordinates
    vec3 N = normalize( normalMatrix*vNormal.xyz);

    // Compute terms in the illumination equation
    vec4 ambient = ambientProduct;

    float Kd = max( dot(L, N), 0.0 );
    vec4  diffuse = Kd*diffuseProduct;

    float Ks = pow( max(dot(N, H), 0.0), shininess );
    vec4  specular = Ks * specularProduct;
    
    if( dot(L, N) < 0.0 ) {
    specular = vec4(0.0, 0.0, 0.0, 1.0);
    } 

    gl_Position = projectionMatrix * modelViewMatrix * vPosition;
    // 环境光 + 漫反射 + 高光反射
    fColor = ambient + diffuse +specular;
    
    fColor.a = 1.0;
}