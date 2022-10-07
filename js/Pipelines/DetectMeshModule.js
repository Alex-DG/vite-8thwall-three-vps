// Defines an 8th Wall XR Camera Pipeline Module which downloads
// and positions a VPS mesh over any detected VPS node.

export const initDetectMeshModule = () => {
  let mesh = null

  const handleMeshUpdate = ({ position, rotation }) => {
    mesh.position.copy(position)
    mesh.quaternion.copy(rotation)
  }

  const handleMeshFound = ({ detail }) => {
    const { bufferGeometry, position, rotation } = detail
    const { scene } = XR8.Threejs.xrScene()

    const texture = null
    const threeMaterial = new THREE.MeshBasicMaterial({
      vertexColors: !texture,
      wireframe: false,
      visible: true,
      map: texture,
    })

    mesh = new THREE.Mesh(bufferGeometry, threeMaterial)
    mesh.name = 'vps-mesh'
    mesh.material.transparent = true
    mesh.material.wireframe = true

    console.log('[ 🎉👘', 'Mesh found! ]', { mesh })

    scene.add(mesh)

    alert('Mesh found 👍')

    handleMeshUpdate({ position, rotation })
  }

  console.log('🏃‍♂️', 'Detect mesh running')
  // Return a camera pipeline module that adds scene elements on start.
  return {
    // Camera pipeline modules need a name. It can be whatever you want but must be unique within
    // your app.
    name: 'detect-mesh',

    // Listeners are called right after the processing stage that fired them. This guarantees that
    // updates can be applied at an appropriate synchronized point in the rendering cycle.
    listeners: [
      { event: 'threejsrenderer.meshupdated', process: handleMeshUpdate },
      { event: 'threejsrenderer.meshfound', process: handleMeshFound },
    ],
  }
}
