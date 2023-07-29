<script setup lang="ts">
import {
	Pointer
} from '@element-plus/icons-vue';
import {ref} from 'vue';
import request from "~/server/utils/request";
import InfoTable from "~/components/InfoTable.vue";
import PageFooter from "~/components/PageFooter.vue";

const requestData = [
	{
		name: 'location',
		meaning: '经纬度坐标',
		description: '传入内容规则：经度在前，纬度在后，经纬度间以“,”分割，经纬度小数点后不要超过 6 位。',
		must: '必需',
		default: '无'
	},
	{
		name: 'poitype',
		meaning: '返回附近POI类型',
		description: '以下内容需要 extensions 参数为 all 时才生效。逆地理编码在进行坐标解析之后不仅可以返回地址描述，也可以返回经纬度附近符合限定要求的POI内容（在 extensions 字段值为 all 时才会返回POI内容）。设置 POI 类型参数相当于为上述操作限定要求。参数仅支持传入POI TYPECODE，可以传入多个POI TYPECODE，相互之间用“|”分隔。获取 POI TYPECODE 可以参考POI分类码表',
		must: '可选',
		default: '无，会进行全国范围内搜索'
	},
	{
		name: 'radius',
		meaning: '搜索半径',
		description: 'radius取值范围在0~3000，默认是1000。单位：米',
		must: '可选',
		default: '1000'
	},
	{
		name: 'extensions',
		meaning: '返回结果控制',
		description: 'extensions 参数默认取值是 base，也就是返回基本地址信息；\n' +
				'\n' +
				'extensions 参数取值为 all 时会返回基本地址信息、附近 POI 内容、道路信息以及道路交叉口信息。',
		must: '可选',
		default: 'base'
	},
	{
		name: 'roadlevel',
		meaning: '道路等级',
		description: '以下内容需要 extensions 参数为 all 时才生效。\n' +
				'\n' +
				'可选值：0，1\n' +
				'当roadlevel=0时，显示所有道路\n' +
				'当roadlevel=1时，过滤非主干道路，仅输出主干道路数据 ',
		must: '可选',
		default: '无'
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
	{
		name: 'homeorcorp',
		meaning: '是否优化POI返回顺序',
		description: '以下内容需要 extensions 参数为 all 时才生效。\n' +
				'\n' +
				'homeorcorp 参数的设置可以影响召回 POI 内容的排序策略，目前提供三个可选参数：\n' +
				'\n' +
				'0：不对召回的排序策略进行干扰。\n' +
				'\n' +
				'1：综合大数据分析将居家相关的 POI 内容优先返回，即优化返回结果中 pois 字段的poi顺序。\n' +
				'\n' +
				'2：综合大数据分析将公司相关的 POI 内容优先返回，即优化返回结果中 pois 字段的poi顺序。',
		must: '可选',
		default: '0'
	}
];

const responseData = [
	{
		name: 'status',
		meaning: '返回结果状态值',
		description: '返回值为 0 或 1，0 表示请求失败；1 表示请求成功。',
	},
	{
		name: 'info',
		meaning: '返回状态说明',
		description: '当 status 为 0 时，info 会返回具体错误原因，否则返回“OK”。',
	},
	{
		id: 4,
		name: 'regeocode',
		meaning: '逆地理编码信息列表',
		description: '返回 regeocode 对象；regeocode 对象包含的数据如下：',
		children: [
			{
				id: 41,
				name: 'addressComponent',
				meaning: '地址元素列表',
				description: '',
				children: [
					{
						id: 411,
						name: 'province',
						meaning: '坐标点所在省名称',
						description: '例如：北京市'
					},
					{
						id: 412,
						name: 'city',
						meaning: '坐标点所在城市名称',
						description: '请注意：当城市是省直辖县时返回为空，以及城市为北京、上海、天津、重庆四个直辖市时，该字段返回为空；省直辖县列表'
					},
					{
						id: 413,
						name: 'citycode',
						meaning: '城市编码',
						description: '例如：010'
					},
					{
						id: 414,
						name: 'district',
						meaning: '坐标点所在区',
						description: '例如：海淀区'
					},
					{
						id: 415,
						name: 'adcode',
						meaning: '行政区编码',
						description: '例如：110108'
					},
					{
						id: 416,
						name: 'township',
						meaning: '坐标点所在乡镇/街道（此街道为社区街道，不是道路信息）',
						description: '例如：燕园街道'
					},
					{
						id: 417,
						name: 'towncode',
						meaning: '乡镇街道编码',
						description: '例如：110101001000'
					},
					{
						id: 418,
						name: 'neighborhood',
						meaning: '社区信息列表',
						description: '',
						children: [
							{
								id: 4181,
								name: 'name',
								meaning: '社区名称',
								description: '例如：北京大学'
							},
							{
								id: 4182,
								name: 'type',
								meaning: 'POI类型',
								description: '例如：科教文化服务;学校;高等院校'
							},
						]
					},
				]
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

let url = ref('http://localhost:3000/api/geocode/regeo?location=118.931191,32.112742');

let isEmpty = ref(true);
let isLoading = ref(false);
let data = ref({});
const handleClick = async () => {
	console.log('发送请求');
	isLoading.value = true;
	const temp = await request(url.value);
	isLoading.value = false;
	data.value = temp.data;
	isEmpty.value = false;
};

let infoDrawer = ref(false);

let isActive = ref('request');

console.log(`isEmpty: ${isEmpty.value}`)
</script>

<template>
	<div>
		<div style="padding: 20px 20px 0 20px; background-color:#fff;">
			<el-descriptions :column="1">
				<template #title>
					<el-breadcrumb separator="/">
						<el-breadcrumb-item>高德地图API</el-breadcrumb-item>
						<el-breadcrumb-item>位置编码</el-breadcrumb-item>
						<el-breadcrumb-item>地理编码</el-breadcrumb-item>
					</el-breadcrumb>
					<div class="title">地理编码</div>
				</template>
				<el-descriptions-item label="Url: ">http://localhost:3000/api/geocode/regeo?params</el-descriptions-item>
				<el-descriptions-item label="Method: ">GET</el-descriptions-item>
			</el-descriptions>
		</div>
		<el-tabs v-model="isActive" @tab-click="handleClick">
			<el-tab-pane label="请求参数" name="request" style="padding: 0 20px;">
				<client-only>
					<el-table :data="requestData" border style="width: 100%">
						<el-table-column prop="name" label="参数名" width="180" />
						<el-table-column prop="meaning" label="含义" width="180" />
						<el-table-column prop="description" label="描述" />
						<el-table-column prop="must" label="是否必填" width="180"/>
						<el-table-column prop="default" label="默认" width="180"/>
					</el-table>
				</client-only>
			</el-tab-pane>
			<el-tab-pane label="响应参数" name="response" style="padding: 0 20px;">
				<client-only>
					<el-table :data="responseData" border style="width: 100%" row-key="id">
						<el-table-column prop="name" label="参数名" width="180" />
						<el-table-column prop="meaning" label="含义" width="180" />
						<el-table-column prop="description" label="描述">
							<template #default="scope">
								<div>
									{{ scope.row.description }}
									<div v-if="scope.row.name === 'info'">
										详情可以
										<el-button @click="infoDrawer = true" size="small">查询</el-button>
										info状态表
									</div>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</client-only>
			</el-tab-pane>
			<el-tab-pane label="接口测试" name="test" style="padding: 0 20px;">
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
			</el-tab-pane>
		</el-tabs>
		<PageFooter />
		<el-drawer v-model="infoDrawer" size="50%">
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
.title {
	margin-right: 12px;
	margin-bottom: 0;
	margin-top: 8px;
	color: rgba(0, 0, 0, 0.85);
	font-weight: 600;
	font-size: 20px;
	line-height: 32px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
:deep(.el-tabs__nav-scroll) {
	background-color: #fff;
	padding: 0 20px;
}
.footer {
	color: rgba(0,0,0,.85);
	font-size: 14px;
	margin: 48px 0 24px;
	padding: 0 16px;
	text-align: center;
}
:deep(.el-table--fit) {
	border-radius: 10px;
}
</style>