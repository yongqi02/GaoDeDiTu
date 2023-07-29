<script setup lang="ts">
const handleClick = () => {
	console.log('click')
}

const tableData = [
	{
		code: '10000',
		returnValue: 'OK',
		description: '请求正常',
		resolution: '请求正常',
	},
	{
		code: '10001',
		returnValue: 'INVALID_USER_KEY',
		description: 'key不正确或过期',
		resolution: '开发者发起请求时，传入的key不正确或者过期',
	},
	{
		code: '300**',
		returnValue: 'ENGINE_RESPONSE_DATA_ERROR',
		description: '服务响应失败',
		resolution: '出现3开头的错误码，建议先检查传入参数是否正确，若无法解决，请详细描述错误复现信息，提工单给我们。（大数据接口请直接跟负责商务反馈）\n' +
				'\n' +
				'如，30001、30002、30003、32000、32001、32002、32003、32200、32201、32202、32203。'
	},
	{
		code: '40000',
		returnValue: 'QUOTA_PLAN_RUN_OUT',
		description: '余额耗尽',
		resolution: '所购买服务的余额耗尽，无法继续使用服务',
	},
	{
		code: '40001',
		returnValue: 'GEOFENCE_MAX_COUNT_REACHED',
		description: '围栏个数达到上限',
		resolution: 'Key可创建的地理围栏的数量，已达上限。',
	},
	{
		code: '40002',
		returnValue: 'SERVICE_EXPIRED',
		description: '购买服务到期',
		resolution: '所购买的服务期限已到，无法继续使用',
	},
	{
		code: '40003',
		returnValue: 'ABROAD_QUOTA_PLAN_RUN_OUT',
		description: '海外服务余额耗尽',
		resolution: '所购买服务的海外余额耗尽，无法继续使用服务',
	},
]
</script>

<template>
	<el-table :data="tableData" style="width: 100%">
		<el-table-column fixed prop="code" label="info码" width="150" />
		<el-table-column prop="returnValue" label="返回值" width="120" />
		<el-table-column prop="description" label="描述" width="120" />
		<el-table-column prop="resolution" label="可能解决方案" width="120" />
	</el-table>
</template>

<style scoped>

</style>