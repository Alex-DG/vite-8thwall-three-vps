import ParticleSystem from '../Experience/ParticleSystem'

export const initWorldPipelineModule = () => {
  let particleSystem

  const init = () => {
    particleSystem = new ParticleSystem({ count: 1500 })

    console.log('✅', 'World ready')
  }

  const updateWorld = () => {
    particleSystem?.update()
  }

  return {
    name: 'world',

    onStart: () => init(),

    onUpdate: () => updateWorld(),
  }
}
