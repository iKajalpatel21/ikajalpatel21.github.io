import { useEffect, useRef } from 'react'

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
precision mediump float;
uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;
uniform vec2  u_clicks[8];
uniform float u_click_t[8];

float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 19.19);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2  shift = vec2(100.0);
  mat2  rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p  = rot * p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  uv.y = 1.0 - uv.y;

  /* mouse warp */
  vec2 mouse = u_mouse / u_res;
  mouse.y = 1.0 - mouse.y;
  float md = length(uv - mouse);
  float warp = 0.12 * exp(-md * md * 8.0);
  vec2 warpedUv = uv + warp * normalize(uv - mouse + 0.0001);

  /* base fbm layers */
  vec2 q = vec2(fbm(warpedUv * 2.5 + u_time * 0.07),
                fbm(warpedUv * 2.5 + vec2(5.2, 1.3) + u_time * 0.05));
  vec2 r = vec2(fbm(warpedUv * 2.0 + 4.0 * q + vec2(1.7, 9.2) + u_time * 0.04),
                fbm(warpedUv * 2.0 + 4.0 * q + vec2(8.3, 2.8) + u_time * 0.03));
  float f = fbm(warpedUv * 1.5 + 4.0 * r + u_time * 0.025);

  /* colour */
  vec3 col = mix(vec3(0.031, 0.031, 0.071),
                 vec3(0.098, 0.039, 0.196), clamp(f * f * 4.0, 0.0, 1.0));
  col = mix(col, vec3(0.02, 0.08, 0.18),  clamp(length(q), 0.0, 1.0));
  col = mix(col, vec3(0.039, 0.184, 0.259), clamp(length(r.x), 0.0, 1.0));

  /* subtle teal vein near mouse */
  float tealBloom = 0.06 * exp(-md * md * 20.0);
  col += vec3(0.0, tealBloom * 0.7, tealBloom);

  /* click ripples */
  for (int i = 0; i < 8; i++) {
    float t = u_click_t[i];
    if (t <= 0.0) continue;
    vec2 cp = u_clicks[i] / u_res;
    cp.y = 1.0 - cp.y;
    float d = length(uv - cp);
    float ring = t * 0.9;
    float w    = 0.004;
    float r2   = 1.0 - smoothstep(0.0, w, abs(d - ring));
    float fade = (1.0 - t) * (1.0 - t);
    col += vec3(0.4, 0.15, 0.9) * r2 * fade * 0.7;
    float inner = 1.0 - smoothstep(0.0, ring * 0.6, d);
    col += vec3(0.0, 0.3, 0.5) * inner * fade * 0.04;
  }

  /* brightness boost */
  col *= 1.4;

  gl_FragColor = vec4(col, 1.0);
}
`

function compileShader(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

function buildProgram(gl) {
  const prog = gl.createProgram()
  gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  return prog
}

const MAX_CLICKS = 8

export default function ShaderBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl')
    if (!gl) return

    const prog = buildProgram(gl)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes    = gl.getUniformLocation(prog, 'u_res')
    const uTime   = gl.getUniformLocation(prog, 'u_time')
    const uMouse  = gl.getUniformLocation(prog, 'u_mouse')
    const uClicks = gl.getUniformLocation(prog, 'u_clicks')
    const uClickT = gl.getUniformLocation(prog, 'u_click_t')

    let mouse = [0, 0]
    let targetMouse = [0, 0]
    const clicks = Array(MAX_CLICKS).fill(null).map(() => ({ x: 0, y: 0, t: 0, active: false }))

    const onMouseMove = (e) => { targetMouse = [e.clientX, e.clientY] }
    const onClick = (e) => {
      const slot = clicks.findIndex(c => !c.active)
      const idx = slot === -1 ? 0 : slot
      clicks[idx] = { x: e.clientX, y: e.clientY, t: 1.0, active: true }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click', onClick)

    let raf
    let last = performance.now()

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    window.addEventListener('resize', resize)
    resize()

    const render = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      mouse[0] += (targetMouse[0] - mouse[0]) * 0.08
      mouse[1] += (targetMouse[1] - mouse[1]) * 0.08

      for (const c of clicks) {
        if (c.active) {
          c.t -= dt * 0.55
          if (c.t <= 0) { c.t = 0; c.active = false }
        }
      }

      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, now * 0.001)
      gl.uniform2f(uMouse, mouse[0], mouse[1])

      const cPos = new Float32Array(MAX_CLICKS * 2)
      const cT   = new Float32Array(MAX_CLICKS)
      clicks.forEach((c, i) => { cPos[i*2] = c.x; cPos[i*2+1] = c.y; cT[i] = c.t })
      gl.uniform2fv(uClicks, cPos)
      gl.uniform1fv(uClickT, cT)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onClick)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  )
}
