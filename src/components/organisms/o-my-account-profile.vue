<template>
	<div class="o-my-account-profile">
		<div class="basic-info">
			<div class="basic-info__avatar">
				<img
					:src="user.profilePicture
						? getAvatar(user.profilePicture.filePath)
						: require('@/assets/icons/user.png')"
				>
				<div class="basic-info__avatar--overlay" @click="$refs.updateImage.click()">{{ $t('Change') }}</div>
				<input type="file" name="avatar" ref="updateImage" class="d-none" @change="updatePicture">
			</div>
			<div class="basic-info__user">
				<h3>{{ `${user.firstName} ${user.lastName}` }}</h3>
				<span>{{ userDetails.job ? $t(userDetails.job) : 'Job Unspecified' }}</span>
				<p>{{ userDetails.description ? $t(userDetails.description) : 'Please write a description.'}}</p>
			</div>
		</div>
		<div class="update-password">
			<h3 @click="editDetails = !editDetails">{{ $t('Edit Details') }}</h3>
			<div class="update-password__form" :class="{'update-password__form--active': editDetails}">
				<div class="update-password__container">
					<SfInput
						v-model="detailsForm.basic.firstName"
						class="update-password__container--item update-password__input"
						type="text"
						label="First Name"
					/>
					<SfInput
						v-model="detailsForm.basic.lastName"
						class="update-password__container--item update-password__input"
						type="text"
						label="Last Name"
					/>
				</div>
				<SfInput
					v-model="detailsForm.details.job"
					class="update-password__input"
					type="text"
					label="Job"
				/>
				<textarea
					v-model="detailsForm.details.description"
					class="update-password__input"
					type="textarea"
					placeholder="Description"
				/>
				<button @click="sendEditDetails">{{ $t('Edit Details') }}</button>
			</div>
		</div>
		<div class="update-password">
			<h3 @click="updatePassword = !updatePassword">{{ $t('Update Password') }}</h3>
			<div class="update-password__form" :class="{'update-password__form--active': updatePassword}">
				<SfInput
					v-model="passwordForm.passwordCurrent"
					class="update-password__input"
					type="password"
					label="Current Password"
				/>
				<div class="update-password__container">
					<SfInput
						v-model="passwordForm.password"
						class="update-password__container--item update-password__input"
						type="password"
						label="New Password"
					/>
					<SfInput
						v-model="passwordForm.passwordConfirm"
						class="update-password__container--item update-password__input"
						type="password"
						label="Confirm"
					/>
				</div>
				<button @click="sendUpdatePassword">{{ $t('Update Password') }}</button>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { SfInput } from '@storefront-ui/vue'
import config from '../../store/resources/endpoints/auth.json'

export default {
	components: {
		SfInput
	},
	data () {
		return {
			editDetails: false,
			updatePassword: false,
			detailsForm: {
				basic: {
					firstName: '',
					lastName: '',
				},
				details: {
					job: '',
					description: ''
				}
			},
			passwordForm: {
				password: '',
				passwordConfirm: '',
				passwordCurrent: ''
			}
		}
	},
	async mounted () {
		await this.fetchCurrentUser()
		await this.fetchCurrentUserDetails()
	},
	computed: {
		...mapGetters({
			user: 'getCurrentUser',
			userDetails: 'getCurrentUserDetails'
		})
	},
	methods: {
		...mapActions({
			fetchCurrentUser: 'fetchCurrentUser',
			fetchCurrentUserDetails: 'fetchCurrentUserDetails',
			updateCurrentUser: 'updateCurrentUser',
			updateCurrentUserDetails: 'updateCurrentUserDetails',
			fetchUpdatePassword: 'updatePassword',
			updateUserImage: 'updateUserImage',
			deleteUserImage: 'deleteUserImage'
		}),
		async sendEditDetails () {
			await this.updateCurrentUser(this.detailsForm.basic)
			await this.updateCurrentUserDetails(this.detailsForm.details)
			this.editDetails = !this.editDetails
		},
		async sendUpdatePassword () {
			await this.fetchUpdatePassword(this.passwordForm)
			this.updatePassword = !this.updatePassword
		},
		async updatePicture (e) {
      let imageFile = e.target.files[0]
      let formData = new FormData()
      formData.append('picture', imageFile)
      if (this.user.profilePicture) {
      	await this.deleteUserImage()
      }
      this.updateUserImage(formData)
    },
    getAvatar (path) {
			return config.api + path
		},
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.basic-info {
	display: flex;
	&__avatar {
		@include for-mobile {
			flex: 1 1 35%;
			max-width: 35%;
			width: 8rem;
			height: 8rem;
			margin-right: var(--spacer-base);
		}
		position: relative;
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: var(--spacer-xl);
    // flex: 1 1 30%;
    &--overlay {
    	display: flex;
    	justify-content: center;
    	align-items: center;
    	position: absolute;
    	width: 100%;
    	height: 100%;
    	background: rgba(0, 0, 0, .5);
    	color: var(--c-white);
    	text-transform: uppercase;
    	font-weight: var(--font-medium);
    	font-family: var(--font-family-secondary);
    	opacity: 0;
    	cursor: pointer;
    	user-select: none;
    	transition: .3s ease;
    	&:hover {
    		opacity: 1;
    	}
    }
    img {
    	position: absolute;
	    width: 100%;
	    height: 100%;
	    object-fit: cover;
    }
	}
	&__user {
		@include for-mobile {
			flex: 1 1 65%;
			max-width: 65%;
		}
		padding: var(--spacer-xs) 0;
    flex: 1 1 70%;
		h3 {
			margin: 0;
			font-size: var(--font-xl);
			font-family: var(--font-family-secondary);
			line-height: 1.2;
		}
		span {
			font-family: var(--font-family-secondary);
			color: var(--c-primary);
			font-weight: var(--font-medium);
			font-size: var(--font-sm);
		}
		p {
			font-family: var(--font-family-primary);
	    font-size: var(--font-xs);
	    line-height: 1.6;
	    max-width: 70%;
	    @include for-mobile {
	    	max-width: 100%;
	    }
		}
	}
}
.update-password {
	margin: var(--spacer-xl) 0 0;
	h3 {
		cursor: pointer;
		font-family: var(--font-family-primary);
    font-weight: var(--font-medium);
    font-size: var(--font-lg);
    margin: 0;
    padding: var(--spacer-xs) 0;
    border-bottom: 1px solid var(--c-primary);
		transition: .15s ease;
    &:hover {
    	color: var(--c-primary);
    }
	}
	button {
		background: var(--c-primary);
    outline: none;
    border: 0;
    padding: var(--spacer-sm);
    width: 100%;
    border-radius: 15px;
    font-family: var(--font-family-secondary);
    color: var(--c-white);
    font-size: var(--font-sm);
    margin: var(--spacer-sm) 0 var(--spacer-xs);
    cursor: pointer;
    transition: .3s ease;

    &:hover {
    	background: var(--c-primary-darken);
    }
	}
	&__form {
		padding: 0 var(--spacer-base);
		background: var(--c-light);
		overflow: hidden;
		max-height: 0;
		transition: .3s ease;
		&--active {
			padding: var(--spacer-lg) var(--spacer-base) var(--spacer-sm);
			max-height: 24rem;
		}
	}
	&__container {
		display: flex;
		width: 100%;

		&--item {
			width: calc(100% - 2rem);
			&:first-child {
				margin-right: var(--spacer-sm);
			}
			&:last-child {
				margin-left: var(--spacer-sm);
			}
			flex: 1 1 calc(50% - 2rem);
		}
	}
	&__input {
		height: 4rem;
	}
	textarea {
		resize: none;
    width: calc(100% - 2rem);
    background: transparent;
    height: 6rem;
    border: 1px solid var(--c-primary);
    border-radius: 15px;
    padding: var(--spacer-sm);
    margin: var(--spacer-sm) 0;
    font-family: var(--font-family-secondary);
    font-size: var(--font-lg);
    transition: ease .3s;
    outline: none;
	}
}
.d-none {
	display: none;
}
</style>