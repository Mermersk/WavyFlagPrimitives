#version 300 es
precision mediump float;
layout(location = 0) out vec4 outputColor;

in float v_wave;
uniform float u_time;
uniform sampler2D u_image;

void main() {

    vec2 nc = gl_FragCoord.xy/vec2(600, 600);

    vec4 flag = texture(u_image, nc - v_wave);

    vec4 col = vec4(1.0, 0.0, 0.0, 1.0);

    outputColor = flag;

}