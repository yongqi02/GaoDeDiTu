<script setup lang="ts">
import {
	Location,
	Search,
	Sunny,
	EditPen,
	Position,
	Switch,
	School,
	Document,
	ChatSquare
} from '@element-plus/icons-vue';
import { ref } from 'vue';
import GeocodeGeo from "~/pages/(components)/GeocodeGeo.vue";

let isShow = ref('0');

function handleClick(value: string) {
	isShow.value = value;
}
</script>

<template>
	<el-container>
		<el-header class="bg-sky-950 h-16">
		</el-header>
		<el-container>
			<el-aside width="200px" class="bg-sky-200">
				<client-only>
					<el-menu
							default-active='1'
							class='el-menu-vertical-demo bg-sky-200'
					>
						<el-sub-menu index='1'>
							<template #title>
								<el-icon><EditPen /></el-icon>
								<span>位置编码</span>
							</template>
							<el-menu-item index='1-1' @click='handleClick("1-1")'>地理编码</el-menu-item>
							<el-menu-item index='1-2' @click='handleClick("1-2")'>逆地理编码</el-menu-item>
						</el-sub-menu>
						<el-sub-menu index='2'>
							<template #title>
								<el-icon><Position /></el-icon>
								<span>路径规划</span>
							</template>
							<el-menu-item index='2-1' @click='handleClick("2-1")'>步行路径规划</el-menu-item>
							<el-menu-item index='2-2' @click='handleClick("2-2")'>公交路径规划</el-menu-item>
							<el-menu-item index='2-3' @click='handleClick("2-3")'>驾车路径规划</el-menu-item>
							<el-menu-item index='2-4' @click='handleClick("2-4")'>骑行路径规划</el-menu-item>
							<el-menu-item index='2-5' @click='handleClick("2-5")'>未来路径规划</el-menu-item>
							<el-menu-item index='2-6' @click='handleClick("2-6")'>距离测量</el-menu-item>
						</el-sub-menu>
						<el-menu-item index='3' @click='handleClick("3")'>
							<el-icon><School /></el-icon>
							<span>刑侦区域查询</span>
						</el-menu-item>
						<el-sub-menu index='4'>
							<template #title>
								<el-icon><Search /></el-icon>
								<span>搜索POI</span>
							</template>
							<el-menu-item index='4-1' @click='handleClick("4-1")'>关键字搜索</el-menu-item>
							<el-menu-item index='4-2' @click='handleClick("4-2")'>周边搜索</el-menu-item>
							<el-menu-item index='4-3' @click='handleClick("4-3")'>多边形搜索</el-menu-item>
							<el-menu-item index='4-4' @click='handleClick("4-4")'>ID搜索</el-menu-item>
						</el-sub-menu>
						<el-menu-item index='5' @click='handleClick("5")'>
							<el-icon><location /></el-icon>
							<span>IP定位</span>
						</el-menu-item>
						<el-menu-item index='6' @click='handleClick("6")'>
							<el-icon><Document /></el-icon>
							<span>静态地图</span>
						</el-menu-item>
						<el-menu-item index='7' @click='handleClick("7")'>
							<el-icon><Switch /></el-icon>
							<span>坐标转换</span>
						</el-menu-item>
						<el-menu-item index='8' @click='handleClick("8")'>
							<el-icon><Sunny /></el-icon>
							<span>天气查询</span>
						</el-menu-item>
						<el-menu-item index='9' @click='handleClick("9")'>
							<el-icon><ChatSquare /></el-icon>
							<span>输入提示</span>
						</el-menu-item>
					</el-menu>
				</client-only>
			</el-aside>
			<el-container>
				<el-main class="bg-sky-50 min-h-screen">
					<GeocodeGeo v-if="isShow === '1-1'"/>
				</el-main>
				<el-footer class="bg-sky-600">Footer</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<style scoped>
.el-menu {
	background-color: initial!important;
}
</style>