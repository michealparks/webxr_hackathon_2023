import type { RigidBody } from '@dimforge/rapier3d-compat'

export const hideBody = (body: RigidBody | null, index: number) => {
  if (body === null) return
  body.setLinvel({ x: 0, y: 0, z: 0 }, false)
  body.setAngvel({ x: 0, y: 0, z: 0 }, false)
  body.setTranslation({ x: 0, y: 9999 + index, z: 0 }, false)
  body.sleep()
}
