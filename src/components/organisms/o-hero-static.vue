<template>
  <div class="o-hero-static">
    <div class="image-container">
      <img src="@/assets/images/bg-advisory.jpg">
      <div class="overlay">
        <div class="content">
          <h1 class="content__title">{{ $t('Financial Consulting Services') }}</h1>
          <ADivider />
          <p class="content__description">
            {{ $t('Our financial consultants will help you, free of charge, in the correct and safe choice for loans, investments and insurance in Germany.') }}
          </p>
          <button class="content__action" @click="goTo('/consultation')">Get a FREE Consultation</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ADivider from '../atoms/a-divider.vue'

export default {
  components: {
    ADivider
  },
  methods: {
    goTo (link) {
      const toRoute = `/${this.$i18n.locale}${link}`
      this.$router.push(toRoute)
    },
  }
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.o-hero-static {
  .image-container {
    position: relative;
    width: 100%;
    height: 100vh;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 25, 41, .75);

      .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        @include for-desktop {
          margin-top: 64px;
          width: 50%;
          margin-left: 10%;
        }
        @include for-mobile {
          height: 90%;
          margin: 0 var(--spacer-base);
        }

        &__title {
          color: var(--c-white);
          font-family: var(--font-family-primary);
          font-weight: var(--font-bold);
          @include for-desktop {
            font-size: 4.25rem;
            margin: 0 0 0 var(--spacer-xl);
          }
          @include for-mobile {
            font-size: 2.25rem;
          }
        }
        &__description {
          color: var(--c-white);
          font-family: var(--font-family-secondary);
          font-weight: var(--font-normal);
          @include for-desktop {
            font-size: 1.25rem;
            margin: 0 0 0 var(--spacer-xl);
          }
          @include for-mobile {
            font-size: var(--font-sm);
            line-height: 1.6;
          }
        }
        &__action {
          background: transparent;
          outline: none;
          border: 2px solid var(--c-primary);
          border-radius: 15px;
          width: fit-content;
          padding: var(--spacer-sm) var(--spacer-2xl);
          color: var(--c-white);
          font-size: var(--font-lg);
          font-family: var(--font-family-secondary);
          cursor: pointer;
          transition: .3s ease;
          &:hover {
            background: rgba(0,126,204,.2);
          }
          @include for-desktop {
            margin: var(--spacer-2xl) 0 0 var(--spacer-xl);
          }
          @include for-mobile {
            width: 80%;
            font-size: var(--font-sm);
            padding: var(--spacer-sm) var(--spacer-xl);
            margin-top: var(--spacer-base);
          }
        }
      }
    }
  }
}
</style>