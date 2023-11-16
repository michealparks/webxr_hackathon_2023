export const inPortal = new Map<number, boolean>()

export const handGestureState = {
  left: {
    firing: false,
    changedThisFrame: false
  },
  right: {
    firing: false,
    changedThisFrame: false
  }
}

export const networkState = {
  sendUpdates: true
}