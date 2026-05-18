import type { HealthApiResponse } from '../types/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default class FetchData {
	private readonly bearerToken?: string;
	private readonly baseUrl: string;

	constructor(bearerToken?: string) {
		this.bearerToken = bearerToken;
		this.baseUrl = BASE_URL;
	}

	async fetchHealthData(): Promise<HealthApiResponse> {
		const response = await fetch(`${this.baseUrl}/Health`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data as HealthApiResponse;
	}
}
