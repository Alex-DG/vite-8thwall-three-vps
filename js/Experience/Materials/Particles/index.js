import { ShaderMaterial, AdditiveBlending } from 'three'

import vertexShader from '../../Shaders/Particles/vertex.glsl'
import fragmentShader from '../../Shaders/Particles/fragment.glsl'

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
