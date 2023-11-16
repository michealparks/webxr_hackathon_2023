import { writable } from "svelte/store"

export const inPortal = new Map<number, boolean>()

export const gameState = {
  score: writable(0),
  reset() {
    gameState.score.set(0)
  }
}

export const bulletState = {
  index: 0,
  hideIndex: 0,
  handles: new Map<number, boolean>(),
  objects: new Map<number, THREE.Object3D>(),
}

export const handGestureState = {
  firing: false
}