<template>
	<div class="booking page">
		<div class="coverImage">
			<img
				:src="require('@/assets/images/planner.jpg')"
			>
			<div class="coverImage__overlay" />
		</div>
		<div class="booking__container">
			<div class="booking__title">
				<h1>{{ $t(title) }}</h1>
				<p>{{ $t(message) }}</p>
			</div>
			<div class="booking__services">
				<div v-for="(service, i) in services" :key="i" class="service" @click="booking.service = service.name">
					<div class="service__icon" :class="{'service__icon--active': service.name == booking.service}">
						<img :src="service.icon">
					</div>
					<span>{{ $t(service.name) }}</span>
				</div>
			</div>
			<div class="booking__form">
				<div class="booking__form--input">
					<span>{{ $t('First name') }}</span>
					<div class="booking__form--input-block">
						<input
							v-model="booking.firstName"
							type="text"
							name="first-name"
							:placeholder="$t('First name')"
						>
						<img src="@/assets/icons/user.png">
					</div>
				</div>
				<div class="booking__form--input">
					<span>{{ $t('Last name') }}</span>
					<div class="booking__form--input-block">
						<input
							v-model="booking.lastName"
							type="text"
							name="last-name"
							:placeholder="$t('Last name')"
						>
						<img src="@/assets/icons/user.png">
					</div>
				</div>
				<div class="booking__form--input">
					<span>{{ $t('Email address') }}</span>
					<div class="booking__form--input-block">
						<input
							v-model="booking.email"
							type="text"
							name="email"
							:placeholder="$t('Email address')"
						>
						<img src="@/assets/icons/email.png">
					</div>
				</div>
				<div class="booking__form--input">
					<span>{{ $t('Phone number') }}</span>
					<div class="booking__form--input-block">
						<input
							v-model="booking.phone"
							type="text"
							name="phone"
							:placeholder="$t('Phone number')"
						>
						<img src="@/assets/icons/phone-receiver-silhouette.png">
					</div>
				</div>
				<div class="booking__form--input-full">
					<span class="labelInput">{{ $t('Schedule date') }}</span>
					<VueDatePicker
						:key="bookingSettings.length"
						v-model="date"
						:allowed-dates="allowedDates"
						class="datePicker"
						no-header
						fullscreen-mobile
						@input="setAppointmentDate"
					/>
				</div>
				<div
					class="booking__form--input-full wrapper"
					:class="{'wrapper__visible': bookingHours.length}"
				>
					<span class="labelInput">{{ $t('Pick an hour') }}</span>
					<div class="hours">
						<div v-for="(hour, i) in bookingHours" :key="i" class="hourInput">	
							<p
								class="hourInput__hour"
								:class="{'hourInput__hour--active': hour == booking.hour}"
								@click="booking.hour = hour"
							>
								{{ hour }}
							</p>
						</div>
					</div>
				</div>
				<div class="booking__form--action">
					<button
						class="booking__form--input-action"
						:class="{'booking__form--input-action-disabled': !validForm}"
						:disabled="!validForm"
						@click="newAppointment"
					>
						{{ $t('Book appointment') }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { VueDatePicker } from '@mathieustan/vue-datepicker';
import VueWebpImage from 'vue-webp-image';

export default {
	components: {
		VueDatePicker
	},
	data () {
		return {
			title: 'Book a FREE Appointment',
			message: "Let us guide you into making the right decisions for your future. It doesn't cost you anything!",
			services: [
				{
					name: 'Counseling',
					icon: require('@/assets/icons/consultation.png')
				},
				{
					name: 'Planning',
					icon: require('@/assets/icons/analysis.png')
				},
				{
					name: 'Retirement & Income',
					icon: require('@/assets/icons/retirement.png')
				},
				{
					name: 'Protection Planning',
					icon: require('@/assets/icons/insurance-policy.png')
				},
			],
			hours: [
				'12:00',
				'12:30',
				'13:00',
				'13:30',
				'14:00',
				'14:30',
				'15:00',
			],
			date: new Date(),
			validForm: false,
			booking: {
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				lang: this.$i18n.locale,
				service: 'Counseling',
				date: '',
				hour: ''
			}
		}
	},
	async mounted () {
		await this.fetchBookingSettings()
	},
	watch: {
		booking: {
			handler (val) {
				if (
					this.booking.firstName &&
					this.booking.lastName &&
					this.booking.email &&
					this.booking.phone &&
					this.booking.service &&
					this.booking.date &&
					this.booking.hour
				) {
					this.validForm = true
				} else {
					return false
				}
			},
			deep: true
		}
	},
	computed: {
		...mapGetters({
			bookingHours: 'getBookingHours',
			bookingSettings: 'getBookingSettingsPublic'
		})
	},
	methods: {
		...mapActions({
			fetchBookingHours: 'fetchBookingHours',
			fetchBookingSettings: 'fetchBookingSettingsPublic',
			createBooking: 'createBooking'
		}),
		newAppointment () {
			this.createBooking(this.booking)
			this.booking = {
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				lang: '',
				service: 'Counseling',
				date: '',
				hour: ''
			}
			this.date = new Date()
		},
		setAppointmentDate () {
			this.booking.date = this.date
			this.fetchBookingHours(this.booking.date)
		},
		// allowedDates (date) {
		// 	const currentDate = new Date()
		// 	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //   return !this.bookingSettings.dayOffExceptions.includes(date)
    //   && !daysOfWeek[new Date(date).getDay()].includes(this.bookingSettings.dayOffRules)
    //   || this.bookingSettings.dayOnExceptions.includes(date)
    // },
    allowedDates(date) {
		  const today = new Date();
		  const inputDate = new Date(date);

		  // Check if the date is in the future
		  if (inputDate < today) {
		    return false; // Date is in the future, so it's not allowed
		  }

		  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		  const dayOfWeek = daysOfWeek[inputDate.getDay()];

		  if (this.bookingSettings.dayOffExceptions.includes(date)) {
		    return false; // Date is in dayOffExceptions, so it's not allowed
		  }

		  if (this.bookingSettings.dayOnExceptions.includes(date)) {
		    return true; // Date is in dayOnExceptions, so it's allowed
		  }

		  return !this.bookingSettings.dayOffRules.includes(dayOfWeek);
		}
	}
}
</script>
<style lang="scss" scoped>
.booking {
	padding: 96px 0 0;
	margin: 0 auto;
	display: flex;
	min-height: calc(100vh - 96px - 112px);
	// max-width: 1272px;

	&__container {
		flex: 1 1 calc(50% - 5rem);
		max-width: calc(50% - 5rem);
		padding: var(--spacer-xl);
	}
	&__title {
		font-family: var(--font-family-secondary);
		color: var(--c-text);
		h1 {
			margin: 0;
			font-size: 2rem;
		}
		p {
			font-size: var(--font-sm);
		}
	}
	&__services {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: var(--spacer-xl) 0;
	}
	&__form {
		display: flex;
		flex-wrap: wrap;
		font-family: var(--font-family-secondary);
		font-size: var(--font-xs);
		font-weight: var(--font-medium);
		&--action {
			flex: 1 1 50%;
			max-width: calc(50% - 2rem);
			margin: .75rem 0;
		}
		&--input {
			flex: 1 1 50%;
			max-width: calc(50% - 2rem);
			margin: .75rem 0;
			&:nth-child(odd) {
				margin-right: var(--spacer-sm);
			}
			&:nth-child(even) {
				margin-left: var(--spacer-sm);
			}
			span {
				display: block;
				margin-bottom: 0.35rem;
			}
			&-full {
				flex: 1 1 100%;
				max-width: calc(100% - 1.75rem);
				margin: .75rem 0;
			}
			&-block {
				position: relative;
				input {
					font-family: var(--font-family-secondary);
					outline: none;
					border: 2px solid var(--c-light-darken);
					border-radius: 8px;
					padding: .75rem var(--spacer-sm) .75rem var(--spacer-lg);
					width: calc(100% - 1rem - 2rem);
				}
				img {
					position: absolute;
					width: .85rem;
					height: .85rem;
					top: .95rem;
					left: .75rem;
				}
			}
			&-action {
				font-family: var(--font-family-secondary);
				font-weight: var(--font-semibold);
				outline: none;
				border: none;
				border-radius: 8px;
				background: var(--c-primary);
				color: var(--c-white);
				cursor: pointer;
				padding: .75rem;
				transition: .3s ease;
				width: 100%;
				&:hover {
					background: var(--c-primary-darken);
				}

				&-disabled {
					background: var(--c-gray);
					cursor: default;
					user-select: none;
					&:hover {
						background: var(--c-gray);
					}
				}
			}
		}
	}
}
.service {
	flex: 1 1 calc(25% - 2rem);
	max-width: calc(25% - 2rem);
	&:first-child {
		margin: 0;
	}
	&:last-child {
		margin: 0;
	}
	margin: 0 var(--spacer-sm);
	text-align: center;
	font-family: var(--font-family-secondary);
	cursor: pointer;
	&__icon {
		position: relative;
		width: 6rem;
		height: 6rem;
		margin: 0 auto;
		box-shadow: 4px 2px 26px -18px rgba(0, 0, 0, 0.75);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: .3s ease;

		&--active {
			background: var(--c-primary);
			img {
				filter: invert(1);
			}
		}
		&:hover {
			background: var(--c-primary);
			img {
				filter: invert(1);
			}
		}
		img {
			width: 50%;
			height: 50%;
			transition: .1s ease;
		}
	}
	span {
		display: block;
		font-size: var(--font-sm);
		font-weight: var(--font-medium);
		margin-top: .75rem;
	}
}
.coverImage {
	position: relative;
	flex: 1 1 50%;
	max-width: 50%;

	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	&__overlay {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgb(255,255,255);
		background: linear-gradient(180deg, rgba(255,255,255,1) 1%, rgba(0,25,41,0.5) 50%, rgba(0,25,41,1) 99%);
	}
}
.datePicker {
	outline: none;
	border: 2px solid var(--c-light-darken);
	border-radius: 8px;
	padding: .5rem var(--spacer-sm) .5rem var(--spacer-xs);
	width: 100%;
	&::v-deep .vd-picker__input {
		.vd-picker__input-icon {
			margin: 0 !important;
			padding: 0 var(--spacer-2xs) 0 0 !important;
		}
		input {
			font-family: var(--font-family-secondary);
			font-size: var(--font-xs) !important;
			padding: 0;
		}
	}
}
.labelInput {
	display: block;
	margin-bottom: 0.35rem;
}
.hours {
	display: flex;
	flex-wrap: wrap;
}
.hourInput {
	flex: 1 1 25%;
	max-width: 25%;
	&__hour {
		display: inline-block;
		font-family: var(--font-family-secondary);
    outline: none;
    border: 2px solid var(--c-light-darken);
    border-radius: 8px;
    padding: 0.75rem var(--spacer-xl);
    margin: 0 0 var(--spacer-sm);
    user-select: none;
    cursor: pointer;
    transition: .3s ease;
    &--active {
    	background: var(--c-primary);
    	color: var(--c-white);
    	border-color: var(--c-primary);
    }
    &:hover {
    	background: var(--c-primary);
    	color: var(--c-white);
    	border-color: var(--c-primary);
    }
	}
}
.wrapper {
	max-height: 0;
	overflow: hidden;
	transition: .3s ease;
	&__visible {
		max-height: 16rem;
		overflow-y: scroll;
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
</style>