import { writable } from 'svelte/store';

export type UserLocation = {
	country: string;
	region: string; // e.g., "Ontario"
	city: string;
	currency: string;
};

export const userLocation = writable<UserLocation | null>(null);
export const isLocationLoading = writable<boolean>(false);
