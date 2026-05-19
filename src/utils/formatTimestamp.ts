const formatTimestamp = (_timestamp?: string): string => {
	if (!_timestamp) return '';
	const date = new Date(_timestamp);
	return date.toLocaleString('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});
};

export default formatTimestamp;
