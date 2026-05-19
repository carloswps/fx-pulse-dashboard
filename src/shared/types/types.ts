export interface HealthApiResponse {
	status: string;
	version: string;
	database: string;
	worker: {
		status: string;
		last_scraping: string;
	};
	timestamp: string;
	envoriment: string;
	machineName: string;
}

export interface DashboardApiResponse {
	id: string;
	value: number;
	coin: string;
	date: string;
	fontUrl: string;
}
