<script setup lang="ts">
import {
	Guide,
	CoffeeCup,
	Search
} from '@element-plus/icons-vue';
import {ref} from 'vue';

const tableData = [
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
];
let url = ref('http://localhost:3000/api/geocode/geo?address=江苏省南京市栖霞区文苑路9号');
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
			http://localhost:4000/api/geocode/geo?params
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
	<el-table :data="tableData" border style="width: 100%">
		<el-table-column prop="date" label="Date" width="180" />
		<el-table-column prop="name" label="Name" width="180" />
		<el-table-column prop="address" label="Address" />
	</el-table>
	<el-divider content-position="left">响应参数</el-divider>
	<el-table :data="tableData" border style="width: 100%">
		<el-table-column prop="date" label="Date" width="180" />
		<el-table-column prop="name" label="Name" width="180" />
		<el-table-column prop="address" label="Address" />
	</el-table>
	<el-divider content-position="left">在线测试</el-divider>
	<el-input
			v-model="url"
			class="input-with-select"
	>
		<template #append>
			<el-button :icon="Search" />
		</template>
	</el-input>
	<el-empty description="暂无数据" />
</div>
</template>

<style scoped>
.cell-item {
	display: flex;
	align-items: center;
}
.el-divider__text {
	background-color: initial;
}
</style>