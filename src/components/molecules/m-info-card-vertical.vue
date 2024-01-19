<template>
	<div class="m-info-card-vertical">
		<div class="card__header">
			<h3>{{ $t(product.title) }}</h3>
			<span>{{ $t(product.subtitle) }}</span>
		</div>
		<div class="card__content">
			<div class="card__content--list">
				<div v-for="(item, i) in product.list" :key="i" class="card__content--list-item">
					<div class="listIcon">
						<img src="@/assets/icons/check.png">
					</div>
					<p>{{ $t(item) }}</p>
				</div>
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
.m-info-card-vertical {
	border-radius: 15px;
	border: 1px solid var(--c-primary-darken);
	overflow: hidden;

	.card {
		&__header {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: var(--spacer-base);
			background: var(--c-primary-darken);
			text-align: center;
			// max-width: calc(100% - 3rem);
			min-height: 8rem;
			h3 {
				margin: 0 0 var(--spacer-2xs);
				font-family: var(--font-family-secondary);
				font-size: var(--font-lg);
				font-weight: var(--font-normal);
				color: var(--c-white);
			}
			span {
				font-family: var(--font-family-primary);
				font-size: var(--font-xs);
				font-weight: var(--font-bold);
				color: #81b2d1;
			}
		}
		&__content {
			padding: var(--spacer-base);

			&--list {
				&-item {
					display: flex;
					padding: var(--spacer-xs) 0;
					p {
						flex: 1 1 90%;
						margin: 0;
						line-height: 1.4;
						font-weight: var(--font-normal);
						font-family: var(--font-family-secondary);
						font-size: var(--font-sm);
					}
				}
			}
		}
	}
}
.listIcon {
	position: relative;
	width: 1rem;
	height: 1rem;
	flex: 1 1 10%;
	margin-right: var(--spacer-xs);
	img {
		height: 100%;
		filter: invert(30%) sepia(90%) saturate(1353%) hue-rotate(179deg) brightness(99%) contrast(101%);
	}
}
</style>