export const randomPointWithinSphere = (
  vec3: THREE.Vector3,
  radius: number
): THREE.Vector3 => {
  const u = Math.random()
  const v = Math.random()
  const w = Math.random()

  // Azimuthal angle
  const theta = 2 * Math.PI * u

  // Polar angle
  const phi = Math.acos((2 * v) - 1)

  // Radius within the sphere
  const r = radius * Math.cbrt(w)

  return vec3.set(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  )
}
