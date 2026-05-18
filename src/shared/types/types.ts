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
