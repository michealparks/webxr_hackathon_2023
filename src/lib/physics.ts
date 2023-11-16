import type { RigidBody } from '@dimforge/rapier3d-compat'

import { bulletState } from './state'

export const hideBody = (body: RigidBody | null) => {
	if (body === null) return
	body.setLinvel({ x: 0, y: 0, z: 0 }, false)
	body.setAngvel({ x: 0, y: 0, z: 0 }, false)
	body.setTranslation({ x: 0, y: 9999 + bulletState.hideIndex, z: 0 }, false)
	body.sleep()

	bulletState.hideIndex += 1
	bulletState.hideIndex %= 100
}
