import request from '~/server/utils/request';
import config from '~/config';

/*
参数接口
 */
interface Params {
	key: string;
	address: string;
	city?: string;
	sig?: string;
	output?: string;
	callback?: string;
}

export default defineEventHandler(async (event) => {
	const query = getQuery(event);

	/*
	参数检验
	 */
	if (!query.address) { return { code: 0, message: '缺少必要参数', data: {} }; }

	/*
	拼接参数
	 */
	const params: Params = { key: config.KEY, address: query.address as string, ...query };

	/*
	发送实际请求
	 */
	const data = await request('/geocode/geo', { params });

	/*
	拼接响应
	 */
	return { code: 1, message: 'success', data: data.data };
});
