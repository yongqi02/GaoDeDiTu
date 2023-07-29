<script setup lang="ts">
defineProps({
	data: Object
});
</script>

<template>
	<json-viewer :value="data" />
</template>

<style scoped>

</style>