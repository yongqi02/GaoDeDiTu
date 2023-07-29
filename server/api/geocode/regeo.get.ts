import request from '~/server/utils/request';
import config from '~/config';

/**
 * 参数接口
 */
interface Params {
	key: string;
	location: string;
	poitype?: string;
	radius?: string;
	extensions?: string;
	roadlevel?: string;
	sig?: string;
	output?: string;
	callback?: string;
	homeorcorp?: string
}

/**
 * 默认导出路由
 */
export default defineEventHandler(async (event) => {
	// 获取请求参数
	const query = getQuery(event);
	// 检验参数
	if (!query.location) {
		return {
			code: 0,
			message: '缺少必要参数',
			data: {}
		}
	}
	// 拼接参数
	const params: Params = {
		key: config.KEY,
		location: query.location as string,
		...query
	}
	// 发起实际请求
	const data = await request('/geocode/regeo', {
		params
	});
	// 拼接响应
	return {
		code: 1,
		message: 'success',
		data: data.data
	};
});
