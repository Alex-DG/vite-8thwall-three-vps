import { ShaderMaterial, AdditiveBlending } from 'three'

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

class ParticleMaterial extends ShaderMaterial {
  constructor(size = 90) {
    super({
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: size },
      },
      vertexShader,
      fragmentShader,
    })
  }
}

export default ParticleMaterial
