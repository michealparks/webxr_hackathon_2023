const count = 100
const positions = new Float32Array(count * 3)
const rotations = new Float32Array(count * 3)
const scales = new Float32Array(count * 3)

const linvels = new Float32Array(count * 3)
const angvels = new Float32Array(count * 3)

let index = 0

const triggerDamageAt = (position: THREE.Vector3, count = 5) => {
  let j = index * 3

  for (let i = index; i < index + count; i += 1) {
    j += 3
  
    positions[j + 0] = position.x
    positions[j + 1] = position.y
    positions[j + 2] = position.z

    rotations[j + 0] = Math.random() * Math.PI * 2
    rotations[j + 1] = Math.random() * Math.PI * 2
    rotations[j + 2] = Math.random() * Math.PI * 2

    scales[j + 0] = 1
    scales[j + 1] = 1
    scales[j + 2] = 1

    linvels[j + 0] = (Math.random() - 0.5) / 10
    linvels[j + 1] = (Math.random() - 0.5) / 10
    linvels[j + 2] = (Math.random()) / 20

    angvels[j + 0] = 0.2
    angvels[j + 1] = 0.2
    angvels[j + 2] = 0.2
  }

  index += count
  index %= 100
}

const hide = (index: number) => {
  const i = index * 3
  positions[i + 0] = 9999
  positions[i + 1] = 9999
  positions[i + 2] = 9999

  linvels[i + 0] = 0
  linvels[i + 1] = 0
  linvels[i + 2] = 0

  angvels[i + 0] = 0
  angvels[i + 1] = 0
  angvels[i + 2] = 0
}

export const particles = {
  count,
  positions,
  rotations,
  scales,
  linvels,
  angvels,
  triggerDamageAt,
  hide
}
