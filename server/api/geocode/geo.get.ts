import request from '~/server/utils/request';
import config from '~/config';

/**
 * 参数接口
 */
interface Params {
	key: string;
	address: string;
	city?: string;
	sig?: string;
	output?: string;
	callback?: string;
}

/**
 * 默认导出路由
 */
export default defineEventHandler(async (event) => {
	// 获取请求参数
	const query = getQuery(event);
	// 检验参数
	if (!query.address) {
		return {
			code: 0,
			message: '缺少必要参数',
			data: {}
		}
	}
	// 拼接参数
	const params: Params = {
		key: config.KEY,
		address: query.address as string,
		...query
	}
	// 发起实际请求
	const data = await request('/geocode/geo', {
		params
	});
	// 拼接响应
	return {
		code: 1,
		message: 'success',
		data: data.data
	};
});
