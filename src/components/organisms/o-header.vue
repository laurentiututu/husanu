<template>
	<div class="o-header" :class="{'o-header__scroll': isScrolled}">
		<div class="left-menu desktop-only" :class="isScrolled ? 'menu-item__scroll' : 'menu-item__default'">
			<div v-for="(menu, i) in leftMenu" :key="i" class="menu-container" @click.stop="goTo(menu.link)">
				<span class="menu-item">{{ $t(menu.name) }}</span>
				<div
					v-if="menu.children"
					class="menu-extend"
					:class="isScrolled ? 'menu-extend__scroll' : 'menu-extend__default'"
				>
					<span
						v-for="(item, j) in menu.children"
						:key="j"
						class="menu-item__children"
						@click.stop="goTo(item.link, item.hash)"
					>
						{{ $t(item.name) }}
					</span>
				</div>
			</div>
		</div>
		<div class="logo">
			<img
				:src="isScrolled ? require('@/assets/logos/logo.png') : require('@/assets/logos/logo_w.png')"
				alt="logo"
				@click="goTo('/')"
			>
		</div>
		<div class="right-menu desktop-only">
			<div class="menu-container" @click="goTo('/my-account')">
				<span
					class="menu-item"
					:class="isScrolled ? 'menu-item__scroll' : 'menu-item__default'"
				>
					{{ $t(agentName) }}
				</span>
			</div>
			<span
				class="menu-item menu-item__highlight"
				@click="goTo('/consultation')"
			>
				{{ $t('Get A FREE Consultation') }}
			</span>
			<div
				class="lang"
				@mouseover="hoverLang = false" 
				@mouseout="hoverLang = true" 
			>
				<div class="lang__current">
					<!-- <img src="@/assets/flags/en.png"> -->
					<img :src="require(`@/assets/flags/${$i18n.locale}.png`)">
				</div>
				<div class="lang__list">
					<div
						v-for="(lang, i) in filteredLangs"
						:key="i"
						class="lang__list--item"
						:class="{'hoverLang': hoverLang}"
						:style="`z-index: ${filteredLangs.length - i}; transform: translateY(${i*3}rem);`"
						@click="setLocale(lang.name)"
					>
						<img :src="lang.flag" :alt="lang.name">
					</div>
				</div>		
			</div>
		</div>
		<div
			class="menuIcon mobile-only"
			:class="{'menuIcon__scroll': !isScrolled}"
			@click="openMenu = !openMenu"
		>
			<img src="@/assets/icons/menu.png">
		</div>
		<transition name="fade">
			<div
				v-if="openMenu"
				class="mobileMenu mobile-only"
				:class="{'mobileMenu__active': openMenu}"
				@click.self="openMenu = !openMenu"
			>
				<transition name="slide" appear>
					<div
						class="mobileMenu__content"
						:class="{
							'mobileMenu__content--active': openMenu,
							'mobileMenu__content--scroll': isScrolled,
							'mobileMenu__content--noScroll': !isScrolled
						}"
					>
						<div class="mobileMenu__content--top">
							<h4>{{ $t('Menu') }}</h4>
							<img src="@/assets/icons/close.png">
						</div>
						<div class="mobileMenu__content--middle">
							<p
								v-for="(item, i) in leftMenu"
								:key="i"
								@click="goTo(item.link), toggleMenu()"
							>
								{{ $t(item.name) }}
							</p>
						</div>
						<div class="mobileMenu__content--bottom">
							<p
								@click="goTo('/my-account'), toggleMenu()"
							>
								{{ $t(agentName) }}
							</p>
							<div class="mobileMenu__content--bottom-langs">
								<div
									v-for="(lang, i) in langs"
									:key="i"
									class="mobileMenu__content--bottom-langs-lang"
									@click="setLocale(lang.name), toggleMenu()"
								>
									<img :src="lang.flag" :alt="lang.name">
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
		</transition>
	</div>
</template>
<script>
export default {
	data () {
		return {
			agentName: 'Agent Login',
			hoverLang: true,
			openMenu: false,
			langs: [
				{
					name: 'en',
					flag: require('@/assets/flags/en.png')
				},
				{
					name: 'ro',
					flag: require('@/assets/flags/ro.png')
				},
				{
					name: 'ru',
					flag: require('@/assets/flags/ru.png')
				},
				{
					name: 'de',
					flag: require('@/assets/flags/de.png')
				},
			],
			leftMenu: [
				{
					name: 'Get Insured',
					link: '/insurances',
					children: [
						{
							name: 'Personal',
							link: 'Insurances',
							hash: '#personal-insurance'
						},
						{
							name: 'Business',
							link: 'Insurances',
							hash: '#business-insurance'
						}
					]
				},
				{
					name: 'Loans in Germany',
					link: '/loans'
				},
				{
					name: 'Investments',
					link: '/investments'
				},
				{
					name: 'Blog',
					link: '/blog'
				}
			],
			windowTop: 0
		}
	},
	mounted() {
		window.addEventListener("scroll", this.onScroll)
		window.addEventListener("storage", this.setAgent)
		window.dispatchEvent(new Event("storage"))
	},
	beforeDestroy() {
		window.removeEventListener("scroll", this.onScroll)
		window.removeEventListener("storage", this.setAgent)
	},
	computed: {
		isScrolled () {
			if ((this.windowTop > 50 && this.$route.name == 'Home') || this.$route.name !== 'Home') {
				return true
			}
			return false
		},
		filteredLangs () {
			return this.langs.filter(lang => lang.name !== this.$i18n.locale)
		}
	},
	methods: {
		onScroll () {
			this.windowTop = window.top.scrollY
		},
		goTo (link, hash) {
			const toRoute = `/${this.$i18n.locale}${link}`
			if (hash) {
				this.$router.push({ name: link, hash: hash })
				return
			} else {
				this.$router.push(toRoute)
				return
			}
		},
		setLocale (locale) {
			this.$i18n.locale = locale
			this.$router.push({ params: { lang: locale }})
		},
		setAgent () {
			let user = JSON.parse(localStorage.getItem('user'))
			user
				? this.agentName = `${user.firstName} ${user.lastName}`
				: this.agentName = 'Agent Login'
		},
		toggleMenu () {
			this.openMenu = !this.openMenu
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.o-header {
	@include for-mobile {
		padding: var(--spacer-sm);
		width: calc(100% - 2rem);
		align-items: center;
	}
	&__scroll {
		background: var(--c-white);
	}
	display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 10;
  width: calc(100% - 10rem);
  padding: var(--spacer-sm) var(--spacer-2xl);
  transition: .3s ease;
	.left-menu {
		display: flex;
		align-items: center;
		flex: 1 1 30%;
		.menu-item {
			margin: 0 var(--spacer-sm);
			&:first-child {
				margin: 0 var(--spacer-sm) 0 0;
			}
		}
	}
	.right-menu {
		display: flex;
		align-items: center;
		flex: 1 1 30%;
		justify-content: flex-end;
		.menu-item {
			margin: 0 var(--spacer-sm);
			&:last-child {
				margin: 0 0 0 var(--spacer-sm);
			}
		}
	}
	.logo {
		position: relative;
    max-width: 14rem;
    height: 4rem;
    flex: 1 1 40%;
    @include for-mobile {
    	max-width: 11rem;
    	height: 3.25rem;
    }
		img {
			position: absolute;
			width: 100%;
			top: 0;
			left: 0;
			cursor: pointer;
		}
	}
	.menu-container {
		position: relative;
		display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
    &:hover {
			.menu-item {
				text-decoration: underline;
			}
			.menu-extend {
				display: block;
				opacity: 1;
			}
    }
	}
	.menu-extend {
		display: none;
		position: absolute;
		top: 100%;
		left: 0;
		min-width: 10rem;
		padding: var(--spacer-sm) 0 var(--spacer-base);
		border: 1px solid var(--c-white);
		backdrop-filter: blur(40px);
		opacity: 0;
		transition: .3s ease;
    &__default {
			background: transparent;
			color: var(--c-white);
		}
		&__scroll {
			background: var(--c-white);
			color: var(--c-text);
		}
	}
	.menu-item {
		&__default {
			color: var(--c-white);
		}
		&__scroll {
			color: var(--c-text);
		}
		font-size: var(--font-sm);
		font-family: var(--font-family-secondary);
		padding: 0.65rem 1rem;
		transition: .3s ease;
		&__highlight {
			border: 1px solid var(--c-primary-lighten);
			border-radius: 10px;
			color: var(--c-white) !important;
			background: var(--c-primary-lighten);
			cursor: pointer;
			&:hover {
				text-decoration: none !important;
				background: rgba(0,142,230,.2);
			}
		}
		&__children {
			display: block;
			font-size: var(--font-sm);
			font-family: var(--font-family-secondary);
			cursor: pointer;
			padding: 0.65rem 1rem;
			transition: .3s ease;
			&:hover {
				text-decoration: underline;
			}
		}
	}
}
.lang {
	position: relative;
	&:hover {
		.lang__current {
			&:before {
				background: rgba(255,255,255,.35);
			}
		}
		.lang__list {
			top: 100%;
			&--item {
				transform: translateY(0);
				& img {
					top: 1rem;
				}
				&:before {
					top: 1rem;
				}
			}
		}
	}
	&__current {
		position: relative;
    width: 2rem;
    height: 2rem;
		margin: 0 1rem;
		img {
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			// object-fit: cover;
			cursor: pointer;
			z-index: 10;
		}
		&:before {
			content: '';
			position: absolute;
			width: 2rem;
			height: 2rem;
			top: 0;
			left: 0;
			z-index: 2;
			border-radius: 50%;
			transition: .3s ease;
			cursor: pointer;
		}
	}
	&__list {
		position: absolute;
		top: 0;
		left: 0;
		transition: .3s ease;
		&--item {
			position: absolute;
			max-width: 2rem;
			max-height: 2rem;
			margin: 0 1rem;
			padding: 2rem 1rem;
			transition: .3s ease;
			img {
				display: block;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				// object-fit: cover;
				cursor: pointer;
				transition: .3s ease;
			}
			&:before {
				content: '';
				position: absolute;
				width: 2rem;
				height: 2rem;
				top: 0;
				left: 0;
				z-index: 1;
				border-radius: 50%;
				cursor: pointer;
				transition: .3s ease;
			}
			&:hover {
				&:before {
					background: rgba(255,255,255,.35);
				}
			}
		}
	}
}
.hoverLang {
	transform: none !important;
	margin: 0 1rem !important;
}
.menuIcon {
	position: relative;
	width: 2.25rem;
	height: 2.25rem;
	img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		filter: invert(30%) sepia(82%) saturate(4318%) hue-rotate(186deg) brightness(87%) contrast(102%);
	}
	&__scroll {
		img {
			filter: invert(1);
		}
	}
}
.mobileMenu {
	position: absolute;
	right: -80vw;
	transition: .5s ease;
	background: rgba(0, 0, 0, .5);
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	// opacity: 0;
	// &__active {
  // 	opacity: 1 !important;
  // }
	&__content {
		position: absolute;
	  height: 87vh;
	  width: 77vw;
	  right: -77vw;
	  display: flex;
	  flex-direction: column;
	  justify-content: space-between;
	  &--scroll {
			background: var(--c-white);
		}
		&--noScroll {
			background: var(--c-white);
	  	// backdrop-filter: blur(40px);
		}
		&--active {
			right: 0 !important;
		}

		&--top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 84px;
			padding: 0 var(--spacer-lg);
			background: var(--c-primary-darken);
			color: var(--c-white);
			h4 {
				font-family: var(--font-family-secondary);
				font-size: var(--font-xl);
				font-weight: var(--font-medium);
				margin: 0;
			}
			img {
				width: 1.25rem;
				height: 1.25rem;
				filter: invert(1);
			}
		}
		&--middle {
			padding: var(--spacer-base) var(--spacer-base);
			p {
				font-family: var(--font-family-secondary);
				font-weight: var(--font-normal);
				font-size: var(--font-base);
				margin: 0;
				padding: var(--spacer-sm) var(--spacer-xs);
				border: solid var(--c-light);
				border-width: 0 0 1px 0;
				transition: .3s ease;
				&:last-child {
					border-width: 0;
				}
				&:hover {
					background: var(--c-light);
				}
			}
		}
		&--bottom {
			padding: var(--spacer-2xl) var(--spacer-base) var(--spacer-xl);
			p {
				font-family: var(--font-family-secondary);
				font-weight: var(--font-normal);
				font-size: var(--font-base);
				margin: 0;
				padding: var(--spacer-sm) var(--spacer-xs);
				border: solid var(--c-light);
				border-width: 0 0 1px 0;
				transition: .3s ease;
				&:hover {
					background: var(--c-light);
				}
			}
			&-langs {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				padding: var(--spacer-xl) 0 0;
				&-lang {
					position: relative;
					width: 2.25rem;
					height: 2.25rem;
					margin: var(--spacer-sm) var(--spacer-xs);
					&:first-child {
						margin-left: 0;
					}
					&:last-child {
						margin-right: 0;
					}
					img {
						position: absolute;
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
				}
			}
		}
	}
}
.slide-enter-active {
	animation: slide .5s;
}

.slide-leave-active {
	animation: slide .5s;
}

@keyframes slide {
  0% {
    transform: translateX(77vw);
  }

  50% {
    transform: translateX(77vw);
  }

  100% {
    transform: translateX(0);
  }
}
</style>