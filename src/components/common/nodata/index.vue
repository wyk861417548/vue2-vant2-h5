<template>
	<div class="j-full-curbox" style="position:fixed;background-color: #fff;"  v-if="show" >
		<div class="j-full-center" style="text-align: center;top: 40%;">
      <slot>
        <img src="@/assets/images/error/nodata.png" alt="图片">
        <div style="color:#5A5B5C;">{{text}}</div>
      </slot>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show:false
			};
		}
	}
</script>

<style lang="less">

</style>
