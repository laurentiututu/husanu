<template>
	<div class="o-accordion-menu services">
		<div class="services__list">
      <div class="services__list--title">
        <div class="services__list--title-icon">
          <img src="@/assets/icons/information.png">
        </div>
        <h3>{{ $t('What insurance are you interested in?') }}</h3>
      </div>
      <div class="services__list--content">
				<div
					v-for="(category, i) in menu"
					:key="i"
					class="accordion"
				>
					<div
						class="services__list--content-item"
						:class="{'services__list--content-item_active': category.slug == selectedCategory}"
						@click="setCategory(category.slug)"
					>
						<div class="list-item__icon">
							<img :src="category.icon ? category.icon : require('@/assets/icons/right-arrow.png')">
						</div>
						<span>{{ $t(category.name) }}</span>
					</div>
					<div
						class="accordion-menu"
						:class="{'accordion-menu__active': category.slug == selectedCategory}"
					>
						<div
							v-for="(item, j) in category.children"
							:key="j"
							class="accordion-menu__item"
							@click="setMenu(item)"
						>
							<div class="accordion-menu__item--icon">
								<img src="@/assets/icons/right-arrow.png">
							</div>
							<span :class="{'accordion-menu__item--active': item.slug == selectedMenu.slug}">{{item.title}}</span>
						</div>
					</div>
				</div>
      </div>
    </div>
    <div v-if="selectedMenu" class="services__details">
      <div class="services__details--info">
        <h2>{{ $t(selectedMenu.title) }}</h2>
        <div v-for="(data, i) in selectedMenu.data" :key="i" class="menuData">
          <h4 v-if="data.type == 'subtitle'">{{ $t(data.content) }}</h4>
          <p v-if="data.type == 'description'">{{ $t(data.content) }}</p>
          <ul v-if="data.type == 'list'">
						<li v-for="(item, j) in data.content" :key="j">
							{{ $t(item) }}
						</li>
          </ul>
          <div v-if="data.type == 'image'" class="dataImage">
						<img :src="data.content">
          </div>
          <span v-if="data.type == 'note'">{{ $t(data.content) }}</span>
        </div>
        <!-- <button class="service-card__content--action">
          <span>{{ $t('Learn More') }}</span>
          <div class="service-card__content--action-icon">
            <img src="@/assets/icons/right-arrow.png">
          </div>
        </button> -->
      </div>
    </div>
	</div>
</template>
<script>

export default {
	props: {
		menu: {
			type: Array,
			default: () => ([]),
			required: true
		}
	},
	data () {
		return {
			selectedCategory: '',
			selectedMenu: ''
		}
	},
	mounted () {
		this.selectedCategory = this.menu[0].slug
		this.selectedMenu = this.menu[0].children[0]
	},
	methods: {
		setCategory (slug) {
			this.selectedCategory = slug
		},
		setMenu (data) {
			this.selectedMenu = data
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.o-accordion-menu {

}
.services {
  @include for-mobile {
    flex-wrap: wrap;
  }
  display: flex;
  // align-items: center;
  justify-content: space-between;
  position: relative;
  max-width: 1272px;
  margin-top: var(--spacer-2xl);
  &__list {
    background: var(--c-light);
    padding: var(--spacer-lg) var(--spacer-lg) var(--spacer-2xl);
    border-radius: 25px;
    width: 35%;
    min-height: 34rem;
    @include for-mobile {
      width: 100%;
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
        @include for-mobile {
          width: 13%;
          // height: auto;
        }
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
          margin: 0 0 0 var(--spacer-base);
          width: 85%;
        }
      }
    }
    &--content {
      &-item {
        display: flex;
        align-items: center;
        padding: var(--spacer-sm) 0;
        cursor: pointer;
        &_active {
          color: var(--c-primary);
        }
        &:hover {
          text-decoration: underline;
          color: var(--c-primary);
          .list-item__icon {
            transform: scale(1.07);
          }
        }
        span {
          display: block;
          font-family: var(--font-family-secondary);
          font-weight: var(--font-medium);
          margin-left: var(--spacer-base);
        }
      }
    }
  }
  &__details {
    @include for-mobile {
      width: 100%;
      margin-top: var(--spacer-sm);
      height: calc(75vh - 96px);
    }
    overflow: hidden;
    width: 55%;
    height: calc(90vh - 96px);
    border-radius: 25px;
    position: sticky;
    @include for-desktop {
      top: calc(96px + 5vh);
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
      }
    }
    &--info {
      @include for-mobile {
        padding: var(--spacer-lg);
      }
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: var(--c-light);
      padding: var(--spacer-2xl);
      height: calc(90vh - 96px - 10rem);
      border-radius: 25px;
      text-align: left;
      overflow-y: scroll;
      h2 {
        margin-top: 0;
        font-family: var(--font-family-primary);
        font-weight: var(--font-bold);
        font-size: var(--font-xl);
      }
      p {
        font-family: var(--font-family-secondary);
        font-size: var(--font-xs);
        font-weight: var(--font-medium);
        line-height: 1.6;
      }
      &::-webkit-scrollbar {
				width: .35rem;
      }
      &::-webkit-scrollbar-track {
				background: var(--c-light-darken);
      }
      &::-webkit-scrollbar-thumb {
				background: var(--c-gray-lighten);
      }
    }
  }

  .list-item {
    &__icon {
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
.accordion {
	border: solid var(--c-light-darken);
	border-width: 0 0 1px 0;
	&:first-child {
    border-width: 1px 0 1px 0;
  }
}
.accordion-menu {
  max-height: 0;
	overflow: hidden;
  transition: .3s ease;
  &__active {
		max-height: 30rem;
  }
  &__item {
    @include for-mobile {
      margin-left: 0;
      max-width: 100%;
    }
    display: flex;
    align-items: center;
		padding: .75rem var(--spacer-base);
    margin-left: 36px;
    font-weight: var(--font-normal);
    font-family: var(--font-family-secondary);
    font-size: var(--font-sm);
    cursor: pointer;
    color: var(--c-text);
    max-width: 50%;
    span {
			margin-left: var(--spacer-xs);
			max-width: 80%;
    }
    &--active {
			color: var(--c-primary);
    }
    &--icon {
			transition: .3s ease;
      position: relative;
      width: 1.5rem;
      height: 1.5rem;
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
    &:hover {
			text-decoration: underline;
			color: var(--c-primary);

			.accordion-menu__item--icon {
				transform: translateX(5px);
			}
    }
  }
}
.dataImage {
	position: relative;
	width: 100%;
	height: 12rem;
  margin: var(--spacer-xs) 0;
	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
.menuData {
	// margin: var(--spacer-xs) 0;
	h4 {
		font-family: var(--font-family-secondary);
		font-size: var(--font-lg);
		margin: var(--spacer-xs) 0;
	}
	p {
		margin: 0;
		font-size: .8rem;
		font-weight: var(--font-normal);
		margin: var(--spacer-xs) 0;
	}
	ul {
		padding: 0 var(--spacer-sm);
		margin: var(--spacer-xs) 0;
		li {
			font-family: var(--font-family-secondary);
			font-size: .8rem;
			padding: var(--spacer-2xs) 0;
			list-style-type: disc;
		}
	}
	span {
    display: block;
    margin: var(--spacer-sm) 0;
    padding: 0.75rem var(--spacer-sm);
    border-left: 4px solid var(--c-primary);
		font-family: var(--font-family-secondary);
    font-size: .8rem;
	}
}
</style>