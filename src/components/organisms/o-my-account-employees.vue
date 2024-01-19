<template>
	<SfTabs>
		<SfTab :title="$t('All Employees')">
			<div class="o-my-account-employees">
				<div v-for="(user, i) in users" :key="i" class="employee">
					<div class="employee__avatar">
						<img
							:src="user.profilePicture
								? getAvatar(user.profilePicture.filePath)
								: require('@/assets/icons/user.png')"
						>
					</div>
					<div class="employee__info">
						<h3>{{ `${user.firstName} ${user.lastName}` }}</h3>
						<template v-if="!user.active">
							<button class="resendActivation" @click="resendActivation(user.email)">{{ $t('Resend Activation') }}</button>
						</template>
						<template v-else-if="user.id == currentUser.id">
							<span class="currentUser">{{ $t('YOU') }}</span>
						</template>
						<template v-else>
							<div class="employee__info--roles">
								<span
									:class="{'employee__info--roles-active': user.role == 'admin'}"
									@click="updateRole(user, 'admin')"
								>
									{{ $t('Admin') }}
								</span>
								<span
									:class="{'employee__info--roles-active': user.role == 'user'}"
									@click="updateRole(user, 'user')"
								>
									{{ $t('Employee') }}
								</span>
							</div>
							<SfCheckbox
								v-model="user.blogAccess"
								class="employee__info--checkbox"
								:label="$t('Blog Access')"
								@change="updateBlogPermissions(user)"
							/>
						</template>
					</div>
				</div>
			</div>
		</SfTab>
		<SfTab :title="$t('Add Employee')">
			<div class="newEmployee">
				<div class="newEmployee__container">
					<SfInput
						v-model="newEmployee.firstName"
						class="newEmployee__input"
						type="text"
						:label="$t('First Name')"
					/>
					<SfInput
						v-model="newEmployee.lastName"
						class="newEmployee__input"
						type="text"
						:label="$t('Last Name')"
					/>
				</div>
				<SfInput
					v-model="newEmployee.email"
					class="newEmployee__input"
					type="email"
					:label="$t('Email address')"
				/>
				<div class="newEmployee__container">
					<SfInput
						v-model="newEmployee.password"
						class="newEmployee__input"
						type="password"
						:label="$t('Password')"
						:hasShowPassword="true"
					/>
					<SfInput
						v-model="newEmployee.passwordConfirm"
						class="newEmployee__input"
						type="password"
						:label="$t('Confirm')"
						:hasShowPassword="true"
					/>
				</div>
				<button class="newEmployee__action" @click="addEmployee">{{ $t('Add Employee') }}</button>
			</div>
		</SfTab>
	</SfTabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { SfCheckbox, SfTabs, SfInput } from '@storefront-ui/vue'
import config from '../../store/resources/endpoints/auth.json'

export default {
	components: {
		SfCheckbox,
		SfTabs,
		SfInput
	},
	data () {
		return {
			newEmployee: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				passwordConfirm: '',
				role: 'user'
			}
		}
	},
	async mounted () {
		await this.fetchUsersAdmin()
	},
	computed: {
		...mapGetters({
			currentUser: 'getCurrentUser',
			users: 'getUsersAdmin'
		})
	},
	methods: {
		...mapActions({
			fetchUsersAdmin: 'fetchUsersAdmin',
			updateUserDetails: 'updateUserDetails',
			fetchRegister: 'fetchRegister',
			resendActivationUrl: 'resendActivationUrl'
		}),
		getAvatar (path) {
			return config.api + path
		},
		updateRole (user, role) {
			user.role !== role
			? this.updateUserDetails({ user: user.id, data: { role: role }})
			: ''
		},
		updateBlogPermissions (user) {
			this.updateUserDetails({ user: user.id, data: { blogAccess: user.blogAccess }})
		},
		addEmployee () {
			this.fetchRegister(this.newEmployee)
		},
		resendActivation (email) {
			this.resendActivationUrl({ email: email })
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.o-my-account-employees {
	display: flex;
	flex-wrap: wrap;
	.employee {
		@include for-mobile {
			flex: 1 1 calc(100% - 2.5rem);
			max-width: calc(100% - 2.5rem);
		}
		align-items: center;
		flex: 1 1 calc(50% - 2.5rem);
		max-width: calc(50% - 2.5rem);
		background: var(--c-light);
		border-radius: 15px;
		display: flex;
		margin: var(--spacer-2xs);
		padding: var(--spacer-sm);
		&__avatar {
			position: relative;
	    width: 5rem;
	    height: 5rem;
	    border-radius: 50%;
	    overflow: hidden;
	    margin-right: var(--spacer-sm);
	    img {
	    	position: absolute;
		    width: 100%;
		    height: 100%;
		    object-fit: cover;
	    }
		}
		&__info {
			padding: var(--spacer-xs) 0;
	    flex: 1 1 70%;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    &--roles {
	    	margin: var(--spacer-2xs) 0;
			  color: var(--c-primary);
			  transition: .3s ease;
	    	span {
					font-family: var(--font-family-secondary);
			    font-weight: var(--font-medium);
			    font-size: var(--font-xs);
			    border: 1px solid var(--c-primary);
			    padding: var(--spacer-2xs) var(--spacer-xs);
			    cursor: pointer;
			    &:last-child {
			    	border-width: 1px 1px 1px 0;
			    }
				}
				&-active {
					background: var(--c-primary);
					color: var(--c-white);
				}
	    }
	    &--checkbox {
	    	--checkbox-size: 1rem;
	    	--checkbox-label-margin: 0 0 0 var(--spacer-xs);
	    	margin: var(--spacer-sm) 0 0;
	    	&::v-deep .sf-checkbox__label {
	    		line-height: 0;
	    	}
	    }
			h3 {
				margin: 0;
				font-size: var(--font-base);
				font-family: var(--font-family-secondary);
				line-height: .8;
			}
			p {
				font-family: var(--font-family-primary);
		    font-size: var(--font-xs);
		    line-height: 1.6;
		    max-width: 70%;
		    margin: var(--spacer-sm) 0 0;
			}
		}
	}
}
.currentUser {
	color: var(--c-white);
  font-family: var(--font-family-secondary);
  font-weight: var(--font-bold);
  background: var(--c-primary);
  border-radius: 5px;
  margin: var(--spacer-sm) 0 0;
  width: 4rem;
  text-align: center;
  padding: 0.1rem 0;
  font-size: var(--font-sm);
  cursor: default;
  user-select: none;
}
.newEmployee {
	&__input {
		height: 4rem;
		flex: 1 1 calc(50% - 2rem);
		margin: var(--spacer-xs);
	}
	&__container {
		display: flex;
		flex-wrap: wrap;
	}
	&__action {
		margin: var(--spacer-sm) var(--spacer-xs);
    width: calc(100% - 1rem);
    padding: var(--spacer-sm);
    font-family: var(--font-family-secondary);
    font-weight: var(--font-medium);
    font-size: var(--font-base);
    border: none;
    color: var(--c-white);
    background: var(--c-primary);
    border-radius: 15px;
    cursor: pointer;
    transition: .3s ease;
    &:hover {
    	background: var(--c-primary-darken);
    }
	}
}
.resendActivation {
	color: var(--c-white);
  font-family: var(--font-family-secondary);
  font-weight: var(--font-medium);
  background: var(--c-primary);
  border-radius: 5px;
  margin: var(--spacer-sm) 0 0;
  text-align: center;
  padding: 0.1rem 0;
  font-size: var(--font-sm);
  cursor: pointer;
  border: none;
  padding: var(--spacer-xs);
  width: 70%;
  transition: .3s ease;
  &:hover {
  	background: var(--c-primary-darken);
  }
}
</style>