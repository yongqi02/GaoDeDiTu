import request from '~/server/utils/request';
import config from '~/config';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);

	const data = await request('/geocode/geo', {
		params: {
			key: config.KEY,
			address: query.address,
			city: query.city ? query.city : '',
			sig: query.sig ? query.sig : '',
			output: query.output ? query.output : '',
			callback: query.callback ? query.callback : ''
		}
	});

	return {
		data: data.data
	};
});
