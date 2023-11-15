import { getContext, setContext } from 'svelte';
import { RealityAccelerator } from 'ratk';
import { useThrelte, useFrame } from '@threlte/core';

const key = Symbol('ratk');

export const createRatk = () => {
	const { renderer } = useThrelte()
	const ratk = new RealityAccelerator(renderer.xr)
	useFrame(() => ratk.update())
	setContext(key, ratk)
};

export const useRatk = (): RealityAccelerator => {
	return getContext(key);
};
