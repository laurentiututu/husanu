<template>
	<div class="agent page">
		<div class="panel cover">
			<img src="@/assets/images/suit.jpg">
			<div class="overlay" />
		</div>
		<div class="panel">
			<div class="form">
				<div>
					<h2 class="form__title">{{ $t(title) }}</h2>
					<div v-if="activeForm == 'login'" class="form__data">
						<SfInput
							v-model="loginForm.email"
							type="email"
							name="email"
							:label="$t('Email address')"
						/>
						<SfInput
							v-model="loginForm.password"
							type="password"
							name="password"
							:label="$t('Password')"
							:hasShowPassword="true"
						/>
						<button
							class="forgotPassword"
							@click="setPanel('forgot', 'Forgot Password')"
						>
							{{ $t('Forgot password?') }}
						</button>
					</div>
					<div v-if="activeForm == 'forgot'" class="form__data">
						<SfInput
							v-model="forgotForm.email"
							type="email"
							name="email"
							:label="$t('Email address')"
						/>
						<button
							class="forgotPassword"
							@click="setPanel('login', 'Login')"
						>
							{{ $t('Go back to Login') }}
						</button>
					</div>
					<div v-if="activeForm == 'reset'" class="form__data">
						<SfInput
							v-model="resetForm.email"
							type="email"
							name="email"
							:label="$t('Email address')"
							disabled
						/>
						<SfInput
							v-model="resetForm.pin"
							type="text"
							name="pin"
							:label="$t('PIN')"
						/>
						<SfInput
							v-model="resetForm.password"
							type="password"
							name="new_password"
							:label="$t('New Password')"
							:hasShowPassword="true"
						/>
						<SfInput
							v-model="resetForm.passwordConfirm"
							type="password"
							name="new_password"
							:label="$t('Confirm Password')"
							:hasShowPassword="true"
						/>
					</div>
				</div>
				<div class="form__action">
					<SfLoader v-show="actionLoading" class="loader" :loading="actionLoading" />
					<button @click="callAction(activeForm)">{{ $t(title) }}</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { SfInput, SfLoader } from '@storefront-ui/vue';
import { mapGetters, mapActions } from 'vuex'

export default {
	components: {
		SfInput,
		SfLoader
	},
	data () {
		return {
			actionLoading: false,
			activeForm: 'login',
			title: 'Login',
			loginForm: {
				email: '',
				password: ''
			},
			forgotForm: {
				email: ''
			},
			resetForm: {
				email: '',
				pin: '',
				password: '',
				passwordConfirm: ''
			}
		}
	},
	methods: {
		...mapActions({
			fetchLogin: 'fetchLogin',
			fetchForgotPassword: 'fetchForgotPassword',
			fetchResetPassword: 'fetchResetPassword'
		}),
		callAction (form) {
			this.actionLoading = true
			switch (form) {
			case 'login':
				this.login()
				break;
			case 'forgot':
				this.forgot()
				break;
			case 'reset':
				this.reset()
				break;

			default: 
				return
			}
			// if (form == 'login') {
			// 	this.login()
			// } else if (form == 'forgot') {
			// 	this.forgot() 
			// } else if (form == 'reset') {
			// 	this.reset()
			// }
		},
		setPanel (panel, title) {
			this.activeForm = panel
			this.title = title
		},
		async login () {
			await this.fetchLogin(this.loginForm)
			this.actionLoading = false
			window.dispatchEvent(new Event("storage"))
		},
		async forgot () {
			await this.fetchForgotPassword(this.forgotForm)
			this.actionLoading = false
			this.resetForm.email = this.forgotForm.email
			this.forgotForm.email = ''
			this.setPanel('reset', 'Reset Password')
		},
		async reset () {
			await this.fetchResetPassword(this.resetForm)
			this.actionLoading = false
			this.loginForm.email = ''
			this.loginForm.password = ''
			this.setPanel('login', 'Login')
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.agent {
	background: var(--c-light);
	display: flex;
	justify-content: space-around;
	padding: 96px 0 0;
	min-height: calc(100vh - 96px - 112px);
	@include for-mobile {
		min-height: calc(100vh - 84px);
		padding: 84px 0 0;
	}
}
.panel {
	flex: 1 1 50%;
	padding: var(--spacer-2xl);
	@include for-mobile {
		position: absolute;
		padding: 0;
		bottom: 0;
		width: 100%;
	}
}
.cover {
	position: relative;
	img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		object-fit: cover;
	}
	.overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: var(--c-primary);
		opacity: .35;
	}
}
.form {
	@include for-mobile {
		padding: var(--spacer-lg);
		width: calc(100% - 4rem);
		height: calc(100% - 4rem);
		border-radius: 15px 15px 0 0;
	}
	background: var(--c-white);
	border-radius: 25px;
	width: calc(100% - 10rem);
	height: calc(100% - 10rem);
	padding: var(--spacer-2xl);
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	&__title {
		margin: 0 0 3.5rem;
		font-family: var(--font-family-secondary);
		font-weight: var(--font-bold);
		font-size: var(--font-xl);
	}
	&__action {
		position: relative;
		border-radius: 10px;
		overflow: hidden;
		.loader {
			position: absolute;
			top: 0;
			left: 0;
			--loader-overlay-background: var(--c-primary);
			--loader-spinner-stroke: var(--c-white);
			&::v-deep svg {
				transform: scale(.75);
			}
		}
		button {
			width: 100%;
			// border: 1px solid var(--c-primary);
			border: none;
			background: var(--c-primary);
			color: var(--c-white);
			cursor: pointer;
			transition: .3s ease;
			padding: var(--spacer-sm);
			font-family: var(--font-family-secondary);
			font-weight: var(--font-medium);
			font-size: var(--font-sm);
			&:hover {
				background: var(--c-primary-darken);
			}
		}
	}
}
.forgotPassword {
	background: transparent;
	outline: none;
	border: 0;
	font-size: var(--font-xs);
	font-family: var(--font-family-secondary);
	font-weight: var(--font-bold);
	color: var(--c-primary);
	padding: 0 0 var(--spacer-base);
	cursor: pointer;
	text-align: right;
	&:hover {
		text-decoration: underline;
	}
}
</style>