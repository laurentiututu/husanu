<template>
	<div class="perks">
    <div v-for="(step, i) in steps" :key="i" class="perk">
      <div class="badge">
        <div class="badge__inner">
          <img :src="step.image">
        </div>
      </div>
      <div class="perk__content">
        <span class="perk__title">{{ $t(step.title) }}</span>
        <p v-if="step.description" class="perk__description">{{ $t(step.description) }}</p>
        <div v-if="step.list">
          <p v-for="(item, i) in step.list" :key="i" class="perk__description listItem">{{ $t(item) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
	
export default {
	props: {
		steps: {
			type: Array,
			default: () => ([])
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.perks {
  display: flex;
  margin-top: var(--spacer-2xl);
  justify-content: center;
  @include for-mobile {
    flex-wrap: wrap;
  }
  .perk {
    margin: 0 var(--spacer-2xl);
    @include for-mobile {
      margin: var(--spacer-sm);
      flex: 1 1 calc(50% - 2rem);
    }
    .badge {
      @include for-mobile {
        width: 7rem;
        height: 7rem;
      }
      background: var(--c-light);
      border-radius: 50%;
      width: 10rem;
      height: 10rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      transition: .3s ease;
      &__inner {
        @include for-mobile {
          width: 6.25rem;
          height: 6.25rem;
        }
        position: relative;
        width: 9rem;
        height: 9rem;
        border-radius: 50%;
        background: var(--c-white);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: .3s ease;
        img {
          width: 55%;
          height: 55%;
          object-fit: cover;
          display: block;
          filter: invert(31%) sepia(96%) saturate(1189%) hue-rotate(178deg) brightness(96%) contrast(102%);
        }
      }
      &:hover {
        background: var(--c-primary-darken);
        img {
          filter: invert(100%) sepia(0%) saturate(7494%) hue-rotate(132deg) brightness(91%) contrast(120%);
        }
        .badge__inner {
          background: var(--c-primary-lighten);
        }
      }
    }
    &__content {
      margin: var(--spacer-base) auto 0;
      max-width: 9rem;
      text-align: center;
    }
    &__title {
      font-family: var(--font-family-secondary);
      font-weight: var(--font-bold);
    }
    &__description {
      font-size: var(--font-sm);
      line-height: 1.6;
      font-family: var(--font-family-secondary);
    }
  }
}
.listItem {
  &:first-child {
    margin: var(--spacer-sm) 0 0;
  }
  &:not(:first-child) {
    margin: 0
  }
}
</style>