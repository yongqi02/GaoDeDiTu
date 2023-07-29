import request from '~/server/utils/request';
import config from '~/config';

interface Params {
	key: string;
	keywords: string;
	type?: string;
	location?: string;
	city?: string;
	citylimit?: string;
	datatype?: string;
	sig?: string;
	output?: string;
	callback?: string;
}

export default defineEventHandler(async (event) => {
	const query = getQuery(event);

	const params: Params = {
		key: config.KEY,
		keywords: query.keywords as string,
		...query
	};

	const data = await request('/assistant/inputtips', {
		params
	});

	return {
		data: data.data
	};
});
