<template>
	<div class="services">
    <div class="services__list">
      <div class="services__list--title">
        <div class="services__list--title-icon">
          <img src="@/assets/icons/information.png">
        </div>
        <h3>{{ $t(title) }}</h3>
      </div>
      <div class="services__list--content">
        <div
          v-for="(service, i) in services"
          :key="i"
          class="services__list--content-item"
          :class="{'services__list--content-item_active': service.name == activeService.name}"
          @click="setService(service)"
        >
          <div class="list-item__icon">
            <img src="@/assets/icons/right-arrow.png">
          </div>
          <span>{{ $t(service.name) }}</span>
        </div>
      </div>
    </div>
    <div class="services__details">
      <div v-if="activeService.children" class="services__details--items">
        <div
          v-for="(card, i) in activeService.children"
          :key="i"
          class="services__details--items-card"
        >
          <div class="service-card__icon">
            <img :src="card.icon">
          </div>
          <div class="service-card__content">
            <div>
              <div class="service-card__content--title">
                <h4>{{ $t(card.title) }}</h4>
              </div>
              <p>{{ $t(card.description) }}</p>
            </div>
            <button class="service-card__content--action">
              <span>{{ $t('Learn More') }}</span>
              <div class="service-card__content--action-icon">
                <img src="@/assets/icons/right-arrow.png">
              </div>
            </button>
          </div>
        </div>
        <button class="seeMore-btn">{{ $t('See More') }}</button>
      </div>
      <div v-else-if="activeService.content" class="services__details--info">
        <div>
          <h4>{{ $t(activeService.content.title) }}</h4>
          <p v-if="activeService.content.description">{{ $t(activeService.content.description) }}</p>
          <p
            v-else-if="activeService.content.list"
            v-for="(item, i) in activeService.content.list"
            :key="i"
          >
            {{ $t(item) }}
          </p>
        </div>
        <button v-if="link" class="service-card__content--action">
          <span>{{ $t('Learn More') }}</span>
          <div class="service-card__content--action-icon">
            <img src="@/assets/icons/right-arrow.png">
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
	props: {
		services: {
			type: Array,
			default: () => ([])
		},
    title: {
      type: String,
      default: 'How can we help you?'
    },
    link: {
      type: Boolean,
      default: true
    }
	},
	data () {
		return {
			activeService: {}
		}
	},
	mounted () {
    this.activeService = this.services[0]
  },
  methods: {
    setService (service) {
      this.activeService = service
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.services {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1272px;
  margin-top: var(--spacer-2xl);
  @include for-mobile {
    flex-wrap: wrap;
  }
  &__list {
    background: var(--c-light);
    padding: var(--spacer-lg);
    border-radius: 25px;
    @include for-desktop {  
      width: 35%;
      min-height: 34rem;
    }
    @include for-mobile {
      width: 100%;
      padding: var(--spacer-base);
      margin: 0 0 var(--spacer-sm);
    }
    &--title {
      display: flex;
      align-items: center;
      padding: var(--spacer-sm) 0 var(--spacer-lg);
      @include for-mobile {
        padding: 0 0 var(--spacer-base);
      }
      &-icon {
        position: relative;
        width: 2.25rem;
        height: 2.25rem;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          object-fit:cover;
          filter: invert(38%) sepia(66%) saturate(3288%) hue-rotate(181deg) brightness(87%) contrast(100%);
        }
      }
      h3 {
        margin: 0 var(--spacer-base);
        font-family: var(--font-family-primary);
        letter-spacing: .5px;
        font-size: var(--font-lg);
        font-weight: var(--font-medium);
        @include for-mobile {
          font-size: var(--font-base);
        }
      }
    }
    &--content {
      &-item {
        display: flex;
        align-items: center;
        padding: var(--spacer-sm) 0;
        border: solid var(--c-light-darken);
        border-width: 0 0 1px 0;
        cursor: pointer;
        &:last-child {
          border-width: 0;
          padding: var(--spacer-sm) 0 0;
        }
        &_active {
          color: var(--c-primary);
        }
        &:first-child {
          border-width: 1px 0 1px 0;
        }
        &:hover {
          text-decoration: underline;
          color: var(--c-primary);
          .list-item__icon {
            transform: translateX(10px);
          }
        }
        span {
          display: block;
          font-family: var(--font-family-secondary);
          font-weight: var(--font-medium);
          margin-left: var(--spacer-base);
          @include for-mobile {
            max-width: 80%;
          }
        }
      }
    }
  }
  &__details {
    @include for-desktop {
      width: 55%;
    }
    @include for-mobile {
      width: 100%;
    }
    &--items {
      display: flex;
      flex-wrap: wrap;
      &-card {
        display: flex;
        height: 12rem;
        flex: 1 1 calc(50% - 3rem);
        background: var(--c-light);
        margin: var(--spacer-xs);
        border-radius: 20px;
        padding: var(--spacer-sm);
        @include for-mobile {
          margin: var(--spacer-xs) 0;
          flex: 1 1 100%;
        }
      }
    }
    &--info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: var(--c-light);
      padding: var(--spacer-2xl);
      border-radius: 25px;
      text-align: left;
      h4 {
        margin-top: 0;
        font-family: var(--font-family-secondary);
        font-weight: var(--font-bold);
        font-size: var(--font-lg);
      }
      p {
        font-family: var(--font-family-secondary);
        font-size: var(--font-xs);
        font-weight: var(--font-medium);
        line-height: 1.6;
      }
      @include for-desktop {
        height: 22rem;
      }
      @include for-mobile {
        padding: var(--spacer-lg);
      }
    }
  }

  .list-item {
    &__icon {
      @include for-mobile {
        max-width: 20%;
      }
      transition: .3s ease;
      position: relative;
      width: 2.25rem;
      height: 2.25rem;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        object-fit:cover;
        filter: invert(38%) sepia(66%) saturate(3288%) hue-rotate(181deg) brightness(87%) contrast(100%);
      }
    }
  }
  .service-card {
    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 2.75rem;
      height: 2.75rem;
      margin-right: var(--spacer-sm);
      background: var(--c-primary);
      border-radius: 50%;
      img {
        width: 50%;
        height: 50%;
        object-fit:cover;
        filter: invert(1);
      }
    }
    &__content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1 1 80%;
      text-align: left;
      &--title {
        display: flex;
        height: 2.75rem;
        h4 {
          margin: 0;
          font-family: var(--font-family-secondary);
          font-weight: var(--font-bold);
          align-self: center;
        }
      }
      p {
        font-family: var(--font-family-secondary);
        font-size: var(--font-xs);
        font-weight: var(--font-medium);
        line-height: 1.6;
        max-width: 90%;
      }
      &--action {
        @include for-mobile {
          margin: var(--spacer-sm) 0 0;
        }
        display: flex;
        align-items: center;
        background: transparent;
        margin: var(--spacer-sm) 0;
        border: 0;
        padding: 0;
        font-family: var(--font-family-primary);
        font-weight: var(--font-medium);
        color: var(--c-primary);
        cursor: pointer;
        &:hover {
          text-decoration: underline;
          img {
            transform: translateX(10px);
          }
        }
        &-icon {
          position: relative;
          width: 1rem;
          height: 1rem;
          img {
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            object-fit:cover;
            margin-left: var(--spacer-xs);
            transition: .3s ease;
            filter: invert(38%) sepia(66%) saturate(3288%) hue-rotate(181deg) brightness(87%) contrast(100%);
          }
        }
      }
    }
  }
}
.seeMore-btn {
  width: 100%;
  flex: 1 1 100%;
  height: 3rem;
  border-radius: 10px;
  border: none;
  margin: var(--spacer-xs);
  color: var(--c-white);
  background: var(--c-primary);
  font-family: var(--font-family-secondary);
  font-weight: var(--font-medium);
  font-size: var(--font-base);
  cursor: pointer;
  transition: .3s ease;
  &:hover {
    background: var(--c-primary-lighten);
  }
  @include for-mobile {
    margin: var(--spacer-xs) 0;
  }
}
</style>