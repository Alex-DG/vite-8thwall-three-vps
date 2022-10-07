import '../styles/app.css'

import * as THREE from 'three'

import VConsole from 'vconsole'

import { initXRScenePipelineModule } from './Pipelines/XRScenePipelineModule'
import { initWorldPipelineModule } from './Pipelines/WorldPipelineModule'
import { initDetectMeshModule } from './Pipelines/DetectMeshModule'

// > Debug console
new VConsole({ theme: 'dark' })

// > XR Modules
const onxrloaded = () => {
  window.THREE = THREE

  XR8.addCameraPipelineModules([
    XR8.GlTextureRenderer.pipelineModule(), // Draws the camera feed.
    XR8.XrController.pipelineModule(), // Enables SLAM tracking.

    XRExtras.AlmostThere.pipelineModule(), // Detects unsupported browsers and gives hints.
    XRExtras.FullWindowCanvas.pipelineModule(), // Modifies the canvas to fill the window.
    XRExtras.Loading.pipelineModule(), // Manages the loading screen on startup.
    XRExtras.RuntimeError.pipelineModule(), // Shows an error image on runtime error.

    initXRScenePipelineModule(), // Create Three.js scene and camera.
    initWorldPipelineModule(), // Create World object(s)
    initDetectMeshModule(), // Downloads and positions a textured VPS mesh over any detected VPS node.
  ])

  // Open the camera and start running the camera run loop.
  XR8.run({ canvas: document.getElementById('experience') })

  console.log('🏃‍♀️', 'XR8 running')
}

// - - - - - - - - - - - - - - - - >
// > Launch Experience: VPS needs to check your current location before starting
// - - - - - - - - - - - - - - - - >

const callback = {
  success: () => {
    window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded)
  },
  error: (error) => {
    console.log('❌ Error location', { error })
  },
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(callback.success, callback.error)
} else {
  console.log('⛔', 'Location: not supported')
}
