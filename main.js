import * as twgl from "./twgl-full.module.js"

const canvas = document.getElementById("c")

canvas.width = 600
canvas.height = 600

const gl = canvas.getContext("webgl2")
console.log(gl)
twgl.isWebGL2(gl) ? console.log("Webgl2 True") : console.error("Not Webgl2")

const vertexShaderSource = fetch("./v.vert").then((response => {
    return response.text().then( (text) => {
        //console.log(text)
        return text
    
    })
}))

const fragmentShaderSource = fetch("./f.frag").then((response => {
    return response.text().then( (text) => {
        //console.log(text)
        return text
    })
}))

Promise.all([vertexShaderSource, fragmentShaderSource]).then( (values) => {
    console.log(values)

    const glProgram = twgl.createProgramInfo(gl, values)
    /*
    const arrays = {
            a_position: { numComponents: 2, data: [
                -1, -1,
                -1, 1,
                1, -1,

                1, -1,
                1, 1,
                -1, 1
            ] },

            
            a_texCoord: { numComponents: 2, data: [
                0, 0,
                0, 1,
                1, 0,

                1, 0,
                1, 1,
                0, 1
            ]}  
            
        }
        */ 

    //const buffers = twgl.createBufferInfoFromArrays(gl, arrays);
    //console.log(buffers)

    const img = twgl.createTexture(gl, {
        src: "FlagIceland.png",
        flipY: true
    })


    const uniforms = {
        u_numberOfVertices: 300,
        u_img: img
    }
    const numberOfVertices = document.querySelector("#vertices input")
    console.log(numberOfVertices)
    numberOfVertices.value = uniforms.u_numberOfVertices;

    const cb = document.querySelectorAll("div input")
    //console.log(cb);

    function draw(time) {
        let checkedInput = "";

        cb.forEach( (elem) => {
            if (elem.checked === true) {
                //console.log(elem);
                checkedInput = elem.defaultValue;
                //console.log(checkedInput)
            }
        })

        const glPrimitive = returnWEBglEnum(checkedInput);
        //console.log(typeof(numberOfVertices.value))
        if (uniforms.u_numberOfVertices !== parseInt(numberOfVertices.value)) {
            uniforms.u_numberOfVertices = parseInt(numberOfVertices.value);
        }

        //----------------------------------------------------------------------------------------

        const timeInSeconds = time * 0.001;
        //console.log(timeInSeconds)
        uniforms.u_time = timeInSeconds;

        gl.useProgram(glProgram.program)
        gl.viewport(0, 0, canvas.width, canvas.height)
        twgl.setUniforms(glProgram, uniforms)
        gl.drawArrays(glPrimitive, 0, uniforms.u_numberOfVertices);

        requestAnimationFrame(draw)

    }

    requestAnimationFrame(draw)


})


function returnWEBglEnum(stringInput) {

    switch (stringInput) {
        case "gl.TRIANGLES": return gl.TRIANGLES
        case "gl.TRIANGLE_STRIP": return gl.TRIANGLE_STRIP
        case "gl.TRIANGLE_FAN": return gl.TRIANGLE_FAN
        case "gl.POINTS": return gl.POINTS
        case "gl.LINES": return gl.LINES
        case "gl.LINE_STRIP": return gl.LINE_STRIP
        case "gl.LINE_LOOP": return gl.LINE_LOOP

    }

}

console.log(returnWEBglEnum("gl.POINTS"))
