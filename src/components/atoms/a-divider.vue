<template>
	<div class="a-divider" :style="`width: ${width}px`" />
</template>
<script>

export default {
	props: {
		width: {
			type: Number,
			default: 125
		}
	}
}
</script>
<style lang="scss" scoped>

.a-divider {
	height: 5px;
  background: linear-gradient(90deg, #007ecc 0%, #01c3e3 30%, #0097f5 100%);
  margin: var(--spacer-base) 0;
}
</style>