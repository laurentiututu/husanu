<template>
	<div class="o-footer">
		<div class="logo mobile-only">
			<img src="@/assets/logos/logo_w.png">
		</div>
		<div class="links">
			<div v-for="(link, i) in links" :key="i" class="links__item">
				<span>{{ $t(link.name) }}</span>
			</div>
		</div>
		<div class="logo desktop-only">
			<img src="@/assets/logos/logo_w.png">
		</div>
		<div class="social">
			<div v-for="(item, i) in social" :key="i" class="social__icon">
				<img :src="item.icon" :alt="item.name">
			</div>
		</div>
	</div>	
</template>
<script>
	
export default {
	data () {
		return {
			links: [
				{
					name: 'Get Insured'
				},
				{
					name: 'Loans'
				},
				{
					name: 'Privacy & Policy'
				},
				{
					name: 'Blog'
				},
			],
			social: [
				{
					name: 'facebook',
					icon: require('@/assets/icons/social/facebook.png')
				},
				{
					name: 'twitter',
					icon: require('@/assets/icons/social/twitter.png')
				},
				{
					name: 'instagram',
					icon: require('@/assets/icons/social/instagram.png')
				},
			]
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.o-footer {
	display: flex;
	justify-content: space-between;
	width: calc(100% - 10rem);
	background: rgba(0, 25, 41, 1);
	padding: var(--spacer-base) var(--spacer-2xl);
	@include for-desktop {
		height: 4rem;
	}
	@include for-mobile {
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: space-between;
		padding: var(--spacer-base) var(--spacer-sm);
		width: calc(100% - 2rem);
		align-items: center;
	}
}
.links {
	display: flex;
	flex: 1 1 30%;
	@include for-mobile {
		justify-content: center;
	}
	&__item {
		display: flex;
		padding: 0.65rem 1rem;
		span {
			@include for-mobile {
				font-size: var(--font-xs);
			}
			align-self: center;
			font-size: var(--font-sm);
			font-weight: var(--font-medium);
			font-family: var(--font-family-secondary);
			color: var(--c-white);
			cursor: pointer;
			&:hover {
				text-decoration: underline;
			}
		}
	}
}
.logo {
	position: relative;
  display: flex;
  align-items: center;
  flex: 1 1 40%;
  max-width: 10rem;
  height: 100%;
  img {
		display: block;
    width: 100%;
    cursor: pointer;
    @include for-mobile {
    	margin: 0 0 var(--spacer-sm);
    }
  }
}

.social {
	display: flex;
	align-items: center;
	flex: 1 1 30%;
	justify-content: flex-end;
	@include for-mobile {
		justify-content: center;
		margin-top: var(--spacer-sm);
	}
	&__icon {
		margin: 0.65rem 1rem;
		position: relative;
		width: 1rem;
		height: 1rem;

		img {
			position: absolute;
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: invert(1);
			cursor: pointer;

			&:hover {
				filter: invert(38%) sepia(66%) saturate(3288%) hue-rotate(181deg) brightness(87%) contrast(100%);
			}
		}
	}
}
</style>