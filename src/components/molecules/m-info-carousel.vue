<template>
	<div class="m-info-carousel">
		<SfCarousel
	    class="m-product-carousel"
	    :settings="settings"
	    :key="info.length"
	  >
	    <SfCarouselItem v-for="(item, i) in info" :key="i">
	      <div class="infoItem">
	      	<p>{{ $t(item.description) }}</p>
	      </div>
	    </SfCarouselItem>
	  </SfCarousel>
	</div>
</template>
<script>
import { SfCarousel } from '@storefront-ui/vue';

export default {
	components: {
    SfCarousel
  },
	props: {
		info: {
			type: Array,
			default: () => ([])
		},
		settings: {
      type: Object,
      default () {
        return {
          animationDuration: 1000,
          rewind: true,
          slidePerPage: false,
          perView: 1,
          autoplay: 3000,
          breakpoints: {
            768: {
              perView: 1,
              peek: {
                before: 0,
                after: 0,
              },
            }
          }
        }
      }
    }
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.m-info-carousel {
 .infoItem {
 	background: var(--c-primary-darken);
 	color: var(--c-white);
 	text-align: center;
 	padding: var(--spacer-sm);
  @include for-mobile {
    height: 5rem;
    display: flex;
    align-items: center;
  }

 	p {
 		margin: 0;
 		font-family: var(--font-family-primary);
 		font-size: var(--font-sm);
 	}
 }
}
</style>