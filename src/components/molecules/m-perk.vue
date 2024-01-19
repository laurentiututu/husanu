<template>
	<div class="m-perk">
		<div class="m-perk__icon">
			<img :src="perk.icon">
		</div>
		<div class="m-perk__description">
			<p>{{ $t(perk.description) }}</p>
			<span v-if="perk.note">{{ $t(perk.note) }}</span>
		</div>
	</div>
</template>
<script>
	
export default {
	props: {
		perk: {
			type: Object,
			default: () => ({})
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.m-perk {
	display: flex;
	align-items: center;
	padding: var(--spacer-sm);
	&__icon {
		position: relative;
		width: 3rem;
		height: 3rem;
		// flex: 1 1 20%;
		img {
			// position: absolute;
			// top: 0;
			// left: 0;
			width: 100%;
			// height: 100%;
			object-fit: cover;
			filter: invert(30%) sepia(90%) saturate(1353%) hue-rotate(179deg) brightness(99%) contrast(101%);
		}
	}
	&__description {
		@include for-mobile {
			font-weight: var(--font-semibold);
		}
		display: flex;
		flex-direction: column;
		justify-content: center;
		// align-items: center;
		margin: 0 0 0 var(--spacer-sm);
		font-weight: var(--font-normal);
		font-family: var(--font-family-secondary);
		font-size: var(--font-sm);
		flex: 1 1 calc(80% - 1rem);
		p {
			margin: 0;
		}
		span {
			font-size: var(--font-2xs);
			margin-top: var(--spacer-xs);
			// font-weight: var(--font-light);
			color: var(--c-primary);
		}
	}
}
</style>