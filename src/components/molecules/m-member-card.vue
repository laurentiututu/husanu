<template>
	<div class="team__member">
		<div class="team__member--picture">
			<img :src="member.image">
		</div>
		<div class="team__member--info">
			<h2>{{ $t("Hi, I'm ") }}<b>{{ member.name }}</b></h2>
			<span>{{ $t(member.role) }}</span>
		</div>
		<div class="team__member--details">
			<p>{{ $t(member.description) }}</p>
		</div>
		<div class="team__member--social">
			<div class="team__member--social-icon">
				<img src="@/assets/icons/social/facebook.png">
			</div>
			<div class="team__member--social-icon">
				<img src="@/assets/icons/social/twitter.png">
			</div>
			<div class="team__member--social-icon">
				<img src="@/assets/icons/social/instagram.png">
			</div>
		</div>
	</div>
</template>
<script>

export default {
	props: {
		member: {
			type: Object,
			default: () => ({})
		}
	},
	methods: {
		getImage (link) {
			return require(link)
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.team {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: var(--spacer-2xl);
  &__member {
    @include for-mobile {
      flex: 1 1 50%;
      max-width: 50%;
      padding: var(--spacer-lg) 0;
      justify-content: space-between;
    }
    flex: 1 1 calc(25% - 4rem);
    max-width: calc(25% - 4rem);
    padding: var(--spacer-xl) var(--spacer-lg);
    transition: .3s ease;
    &--picture {
      @include for-mobile {
        width: 7rem;
        height: 7rem;
      }
      position: relative;
      width: 10rem;
      height: 10rem;
      overflow: hidden;
      border-radius: 50%;
      margin: 0 auto;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        object-fit: cover;
      }
    }
    &--info {
      margin-top: var(--spacer-xl);
      @include for-mobile {
        margin-top: var(--font-lg);
      }
      h2 {
        margin: 0;
        font-family: var(--font-family-secondary);
        font-size: var(--font-xl);
        font-weight: var(--font-normal);
        @include for-mobile {
          font-size: var(--font-lg);
        }
      }
      span {
        display: block;
        font-family: var(--font-family-secondary);
        font-weight: var(--font-normal);
        font-size: var(--font-xs);
        margin-top: var(--spacer-xs);
        letter-spacing: .5px;
        color: var(--c-primary);
      }
    }
    &--details {
      p {
        font-family: var(--font-family-secondary);
        font-weight: var(--font-medium);
        font-size: var(--font-sm);
        line-height: 1.8;
        margin: var(--spacer-xl) 0 0;
        @include for-mobile {
          margin: var(--spacer-base) var(--spacer-xs) 0;
          font-size: var(--font-xs);
        }
      }
    }
    &--social {
      display: flex;
      justify-content: center;
      margin-top: var(--spacer-xl);
      &-icon {
        position: relative;
        width: 1rem;
        height: 1rem;
        margin: 0 var(--spacer-sm);
        @include for-mobile {
          margin: 0 .75rem;
        }
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: pointer;
        }
      }
    }
    &:hover {
      box-shadow: 0px 0px 25px -20px rgba(0,0,0,0.75);
      .team__member--social-icon {
        img {
          filter: invert(38%) sepia(66%) saturate(3288%) hue-rotate(181deg) brightness(87%) contrast(100%);
        }
      }
    }
  }
}
</style>