<script setup lang="ts">
import {
	Guide,
	CoffeeCup,
	Pointer
} from '@element-plus/icons-vue';
import {ref} from 'vue';
import request from "~/server/utils/request";
import InfoTable from "~/components/InfoTable.vue";

const requestData = [
	{
		name: 'address',
		meaning: '结构化地址信息',
		description: '规则遵循：国家、省份、城市、区县、城镇、乡村、街道、门牌号码、屋邨、大厦，如：北京市朝阳区阜通东大街6号。',
		must: '必需',
		default: '无'
	},
	{
		name: 'city',
		meaning: '指定查询的城市',
		description: '可选输入内容包括：指定城市的中文（如北京）、指定城市的中文全拼（beijing）、citycode（010）、adcode（110000），不支持县级市。当指定城市查询内容为空时，会进行全国范围内的地址转换检索。\n' +
				'\n' +
				'adcode信息可参考城市编码表获取',
		must: '可选',
		default: '无，会进行全国范围内搜索'
	},
	{
		name: 'sig',
		meaning: '数字签名',
		description: '请参考数字签名获取和使用方法',
		must: '可选',
		default: '无'
	},
	{
		name: 'output',
		meaning: '返回数据格式类型',
		description: '可选输入内容包括：JSON，XML。设置 JSON 返回结果数据将会以JSON结构构成；如果设置 XML 返回结果数据将以 XML 结构构成。',
		must: '可选',
		default: 'JSON'
	},
	{
		name: 'callback',
		meaning: '回调函数',
		description: 'callback 值是用户定义的函数名称，此参数只在 output 参数设置为 JSON 时有效。',
		must: '可选',
		default: '无'
	},
];

const responseData = [
	{
		name: 'status',
		meaning: '返回结果状态值',
		description: '返回值为 0 或 1，0 表示请求失败；1 表示请求成功。',
	},
	{
		name: 'count',
		meaning: '返回结果数目',
		description: '返回结果的个数',
	},
	{
		name: 'info',
		meaning: '返回状态说明',
		description: '当 status 为 0 时，info 会返回具体错误原因，否则返回“OK”。',
	},
	{
		id: 4,
		name: 'geocodes',
		meaning: '地理编码信息列表',
		description: '结果对象列表，包括下述字段：',
		children: [
			{
				id: 41,
				name: 'country',
				meaning: '国家',
				description: '国内地址默认返回中国'
			},
			{
				id: 42,
				name: 'province',
				meaning: '地址所在的省份名',
				description: '例如：北京市。此处需要注意的是，中国的四大直辖市也算作省级单位。'
			},
			{
				id: 43,
				name: 'city',
				meaning: '地址所在的城市名',
				description: '例如：北京市'
			},
			{
				id: 44,
				name: 'citycode',
				meaning: '城市编码',
				description: '例如：010'
			},
			{
				id: 45,
				name: 'district',
				meaning: '地址所在的区',
				description: '例如：朝阳区'
			},
			{
				id: 46,
				name: 'street',
				meaning: '街道',
				description: '例如：阜通东大街'
			},
			{
				id: 47,
				name: 'number',
				meaning: '门牌',
				description: '例如：6号'
			},
			{
				id: 48,
				name: 'adcode',
				meaning: '区域编码',
				description: '例如：110101'
			},
			{
				id: 49,
				name: 'location',
				meaning: '坐标点',
				description: '经度，纬度'
			},
			{
				id: 50,
				name: 'level',
				meaning: '匹配级别',
				description: '参见下方的地理编码匹配级别列表'
			},
		]
	}
];

let url = ref('http://localhost:3000/api/geocode/geo?address=江苏省南京市栖霞区文苑路9号');

let isEmpty = ref(true);
let isLoading = ref(false);
let data = ref({});
const handleClick = async () => {
	isLoading.value = true;
	const temp = await request(url.value);
	isLoading.value = false;
	data.value = temp.data;
	isEmpty.value = false;
};

let infoDrawer = ref(false);

</script>

<template>
<div>
	<el-descriptions
			class="margin-top"
			:column="1"
			border
			size="large"
	>
		<template #title>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>高德地图API</el-breadcrumb-item>
				<el-breadcrumb-item>位置编码</el-breadcrumb-item>
				<el-breadcrumb-item>地理编码</el-breadcrumb-item>
			</el-breadcrumb>
		</template>
		<el-descriptions-item>
			<template #label>
				<div class="cell-item">
					<el-icon><Guide /></el-icon>
					&nbsp;&nbsp;
					Url
				</div>
			</template>
			http://localhost:3000/api/geocode/geo?params
		</el-descriptions-item>
		<el-descriptions-item>
			<template #label>
				<div class="cell-item">
					<el-icon><CoffeeCup /></el-icon>
					&nbsp;&nbsp;
					Method
				</div>
			</template>
			GET
		</el-descriptions-item>
	</el-descriptions>
	<el-divider content-position="left">请求参数</el-divider>
	<client-only>
		<el-table :data="requestData" border style="width: 100%">
			<el-table-column prop="name" label="参数名" width="180" />
			<el-table-column prop="meaning" label="含义" width="180" />
			<el-table-column prop="description" label="描述" />
			<el-table-column prop="must" label="是否必填" width="180"/>
			<el-table-column prop="default" label="默认" width="180"/>
		</el-table>
	</client-only>
	<el-divider content-position="left">响应参数</el-divider>
	<client-only>
		<el-table :data="responseData" border style="width: 100%" row-key="id">
			<el-table-column prop="name" label="参数名" width="180" />
			<el-table-column prop="meaning" label="含义" width="180" />
			<el-table-column prop="description" label="描述">
				<template #default="scope">
					<div>
						{{ scope.row.description }}
						<el-button v-if="scope.row.name === 'info'" @click="infoDrawer = true">详情可以查询info状态表</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
	</client-only>
	<el-divider content-position="left">在线测试</el-divider>
	<el-input
			v-model="url"
			class="input-with-select"
	>
		<template #append>
			<el-button :icon="Pointer" @click="handleClick"/>
		</template>
	</el-input>
	<el-empty description="暂无数据" v-if="isEmpty"/>
	<JsonVierer :data="data.data" v-if="!isEmpty" v-loading="isLoading"></JsonVierer>
	<el-drawer v-model="infoDrawer">
		<template #header>
			<h4>Info状态表</h4>
		</template>
		<template #default>
			<InfoTable />
		</template>
	</el-drawer>
</div>
</template>

<style scoped lang="less">
.cell-item {
	display: flex;
	align-items: center;
}
:deep(.el-divider__text) {
	background-color: #f0f9ff!important;
}
</style>