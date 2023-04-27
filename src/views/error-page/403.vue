<template>
	<div class="j-full-curbox" style="position:fixed;background-color: #fff;">
		<div class="j-full-center" style="text-align: center;top: 40%;">
			<img src="@/assets/images/error/403.png" alt="图片">
			<div style="color:#5A5B5C;">暂无权限</div>

      <p class="el-button el-button-primary mt-20" style="width:80vw" @click="$router.back()">返 回</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			};
		}
	}
</script>

<style lang="less">

</style>
