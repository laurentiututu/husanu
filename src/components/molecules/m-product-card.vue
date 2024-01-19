<template>
	<div class="m-product-card">
		<div class="cover">
			<img :src="product.image">
		</div>
		<div class="content">
			<div class="content__title">
				<h3>{{ $t(product.title) }}</h3>
			</div>
			<div class="content__description">
				<p>{{ $t(product.description) }}</p>
			</div>
		</div>
	</div>
</template>
<script>

export default {
	props: {
		product: {
			type: Object,
			default: () => ({})
		}
	}
}
</script>
<style lang="scss" scoped>
.m-product-card {
	position: relative;
	overflow: hidden;
	cursor: pointer;
	&:hover {
		.content {
			transform: none;
		}
	}
	.cover {
		position: relative;
    min-width: 18rem;
    min-height: 14rem;
		img {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			object-fit: cover;
		}
	}
	.content {
		position: absolute;
		top: 0;
		height: calc(100% - 3rem);
		text-align: center;
		padding: var(--spacer-base) var(--spacer-xl);
		background: #001929;
		color: var(--c-white);
		transform: translateY(70%);
		transition: .3s ease;
		&__title {
			margin-bottom: var(--spacer-base);
			h3 {
				margin: 0;
				font-family: var(--font-family-primary);
				font-weight: var(--font-medium);
				font-size: var(--font-lg);
			}
		}
		&__description {
			p {
				margin: 0;
				font-family: var(--font-family-secondary);
				font-weight: var(--font-normal);
				font-size: var(--font-xs);
				line-height: 1.6;
			}
		}
	}
}
</style>