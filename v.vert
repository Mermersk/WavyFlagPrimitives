#version 300 es
precision mediump float;
//in vec4 a_position;
uniform int u_numberOfVertices;
uniform float u_time;

//v_wave is going to fragment shader
out float v_wave;

#define PI 3.141592653589793238462643383

void main() {
    //gl_VertexID is the literal index value of the current vertex thats being processed.
    float u = float(gl_VertexID) / float(u_numberOfVertices);
    //u is 0.0 to 1.0, vertexCoords are -1.0 to 1.0
    float vertexCoords = (u * 2.0) - 1.0;

    float wave = (sin((u_time * 3.0) + vertexCoords * 2.68) / 20.0);

    v_wave = wave;

    float yTop = 0.9 + wave;
    float yBottom = -0.9 + wave;

    gl_PointSize = 10.0;//abs(sin(u_time)) * 20.0;
    //vec2 pos = vec2(((u*2.0) - 0.98), 0.0);

    float fullCircle = vertexCoords * PI * 2.0; //+ u_time;

    //vec2 pos = vec2(cos(fullCircle), sin(fullCircle)) * 0.5;
    vec2 pos = vec2(vertexCoords, yTop);
    float ss = mod(3.0, 2.0);

    if (mod(float(gl_VertexID), 2.0) == 0.0) {
        pos = vec2(vertexCoords, yBottom);
    }

    gl_Position = vec4(pos, 0.0, 1.0);

}