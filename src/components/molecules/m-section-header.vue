<template>
	<div class="m-section-header">
		<h4 v-if="subtitle" class="title__small">{{ $t('Welcome to ') }}<span>Husanu</span></h4>
    <h1 class="title">{{ $t(title) }}</h1>
    <ADivider />
    <p v-if="description" class="description">{{ $t(description) }}</p>
    <!-- <p class="description">A modern CPA firm that is your catalyst to actionable insights, dedicated support, and transparent reporting so you can meet and exceed your financial goals.</p> -->
	</div>
</template>
<script>
import ADivider from '../atoms/a-divider.vue'

export default {
	components: {
		ADivider
	},
	props: {
		title: {
			type: String,
			default: '',
			required: true
		},
		subtitle: {
			type: Boolean,
			default: false
		},
		description: {
			type: String,
			default: ''
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.m-section-header {
	.title {
    font-family: var(--font-family-secondary);
    font-weight: var(--font-bold);
    font-size: 3rem;
    margin: 0 auto;
    @include for-desktop {
      max-width: 50%;
    }
    @include for-mobile {
      font-size: 2.5rem;
    }
    &__small {
      font-size: var(--font-sm);
      font-family: var(--font-family-primary);
      font-weight: var(--font-bold);
      text-transform: uppercase;
      color: var(--c-text);
      margin: 0 0 var(--spacer-sm);
      span {
        color: var(--c-primary);
      }
    }
  }
  .description {
    font-family: var(--font-family-secondary);
    font-weight: var(--font-medium);
    font-size: var(--font-sm);
    margin: 0 auto;
    @include for-desktop {
      max-width: 50%;
    }
    @include for-mobile {
      line-height: 1.4;
    }
  }
  &::v-deep .a-divider {
    margin: var(--spacer-xl) auto;
  }
}
</style>