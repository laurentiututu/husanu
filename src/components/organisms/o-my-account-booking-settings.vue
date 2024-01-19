<template>
	<div class="o-my-account-booking-settings">
		<h1 class="sectionTitle">{{ $t('Rules') }}</h1>
		<SfCarousel
	    class="m-product-carousel"
	    :settings="settings"
	    :key="bookingSettings.length"
	    :defaultColor="true"
	  >
			<SfCarouselItem v-for="(day, i) in bookingSettings" :key="i">
				<div class="day" :class="{'day__disabled': day.rules.dayOff}">
					<div class="day__title" :class="{'day__title--disabled': day.rules.dayOff}">
						<div class="relative">
							<h3>{{ day.name }}</h3>
							<!-- <p v-if="!day.rules.type" class="note">{{ $t('Rules are not set for this day!') }}</p> -->
						</div>
					</div>
					<div class="day__form" :class="{'day__form--disabled': day.rules.dayOff}">
						<SfCheckbox
							class="day__title--checkbox"
							v-model="day.rules.dayOff"
							:label="$t('Day off')"
							@change="updateAvailable = true"
						/>
						<div class="day__form--input">
							<span>{{ $t('Start hour') }}</span>
							<div class="day__form--input-block">
								<input
									v-model="day.rules.startHour"
									type="time"
									name="start-hour"
									:placeholder="$t('Start hour')"
									@input="updateAvailable = true"
								>
								<!-- <img src="@/assets/icons/login.png"> -->
							</div>
						</div>
						<div class="day__form--input">
							<span>{{ $t('End hour') }}</span>
							<div class="day__form--input-block">
								<input
									v-model="day.rules.endHour"
									type="time"
									name="end-hour"
									:placeholder="$t('End hour')"
									@input="updateAvailable = true"
								>
								<!-- <img src="@/assets/icons/logout.png"> -->
							</div>
						</div>
						<div class="day__form--input">
							<span>{{ $t('Appointment interval') }}</span>
							<div class="day__form--input-block">
								<input
									v-model="day.rules.interval"
									type="number"
									name="last-name"
									:placeholder="$t('Interval (minutes)')"
									@input="updateAvailable = true"
								>
								<!-- <img src="@/assets/icons/time-left.png"> -->
							</div>
						</div>
					</div>
					<div v-if="day.exceptions.length" class="exception__container">
						<h4>{{ $t('Exceptions') }}</h4>
						<div v-for="(exception, j) in day.exceptions" :key="j" class="exception">
							<img
								src="@/assets/icons/close.png"
								class="exception__delete"
								@click="deleteException(day.name, exception.id)"
							>
							<template v-if="!exception.dayOff">
								<p><b>{{ $t('Date: ') }}</b>{{ getFormattedDate(exception.exceptionDate) }}</p>
								<p><b>{{ $t('Hours: ') }}</b>{{ `${exception.startHour} - ${exception.endHour}` }}</p>
								<p><b>{{ $t('Interval: ') }}</b>{{ `${exception.interval} min` }}</p>
							</template>
							<p v-else>
								<b>{{ $t('Date: ') }}</b>
								{{ `${getFormattedDate(exception.exceptionDate)} - ` }}
								<b class="dayOff">{{ $t('Day off') }}</b>
							</p>
						</div>
					</div>
				</div>
			</SfCarouselItem>
		</SfCarousel>
		<button
			class="update"
			:class="{'update__disabled': !updateAvailable }"
			:disabled="!updateAvailable"
			@click="updateRules"
		>
			{{ $t('Update rules') }}
		</button>
		<h1 class="sectionTitle">{{ $t('Add Exception') }}</h1>
		<SfCheckbox
			class="day__title--checkbox"
			v-model="exception.dayOff"
			:label="$t('Day off')"
		/>
		<div class="containerFlex">
			<div class="day__form--input day__form--input-half">
				<span class="labelInput">{{ $t('Schedule date') }}</span>
				<div class="day__form--input-block day__form--input-block-half rightMargin widthFix">
					<VueDatePicker
				    v-model="date"
				    class="datePicker"
				    :placeholder="$t('From - To')"
				    range
				    :range-header-text="`${$t('From')} %d ${$t('To')} %d`"
				    :range-input-text="`${$t('From')} %d ${$t('To')} %d`"
				    fullscreen-mobile
				    validate
						@input="setExceptionDate"
				  />
					<!-- <img src="@/assets/icons/time-left.png"> -->
				</div>
			</div>
			<div class="day__form--input day__form--input-half">
				<span class="labelInput leftMargin">{{ $t('Appointment interval') }}</span>
				<div class="day__form--input-block day__form--input-block-half leftMargin">
					<input
						v-model="exception.interval"
						type="number"
						name="interval"
						:placeholder="$t('Interval (minutes)')"
					>
					<!-- <img src="@/assets/icons/time-left.png"> -->
				</div>
			</div>
		</div>
		<div class="containerFlex">
			<div class="day__form--input day__form--input-half">
				<span class="labelInput">{{ $t('Start hour') }}</span>
				<div class="day__form--input-block day__form--input-block-half rightMargin">
					<input
						v-model="exception.startHour"
						type="time"
						name="start-hour"
						:placeholder="$t('Start hour')"
					>
					<!-- <img src="@/assets/icons/time-left.png"> -->
				</div>
			</div>
			<div class="day__form--input day__form--input-half">
				<span class="labelInput leftMargin">{{ $t('End hour') }}</span>
				<div class="day__form--input-block day__form--input-block-half leftMargin">
					<input
						v-model="exception.endHour"
						type="time"
						name="end-hour"
						:placeholder="$t('End hour')"
					>
					<!-- <img src="@/assets/icons/time-left.png"> -->
				</div>
			</div>
		</div>
		<button
			class="update update__marginFix"
			@click="addException"
		>
			{{ $t('Add exception') }}
		</button>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { SfCheckbox, SfCarousel } from '@storefront-ui/vue'
import { VueDatePicker } from '@mathieustan/vue-datepicker';

export default {
	components: {
		SfCheckbox,
		SfCarousel,
		VueDatePicker
	},
	data () {
		return {
			originalBookingSettings: [],
			updateAvailable: false,
			days: [],
			active: false,
			settings: {
	      animationDuration: 300,
	      rewind: true,
	      slidePerPage: false,
	      perView: 3,
	      peek: {
          before: 0,
          after: 30,
        },
	      breakpoints: {
	        768: {
	          perView: 1,
	          peek: {
	            before: 0,
	            after: 30,
	          },
	        }
	      }
      },
      exception: {
      	dateFrom: '',
      	dateTo: '',
      	startHour: '',
      	endHour: '',
      	interval: '',
      	dayOff: false
      },
      date: new Date()
		}
	},
	async mounted () {
		await this.prepareBookingSettings()
	},
	// watch: {
	// 	bookingSettings: {
	// 		handler () {
	// 			this.updateAvailable = true
	// 		},
	// 		deep: true
	// 	}
	// },
	computed: {
		...mapGetters({
			bookingSettings: 'getBookingSettingsAdmin'
		})
	},
	methods: {
		...mapActions({
			fetchBookingSettings: 'fetchBookingSettingsAdmin',
			updateBookingRules: 'updateBookingRules',
			newBookingException: 'newBookingException',
			removeBookingException: 'removeBookingException'
		}),
		async prepareBookingSettings () {
			await this.fetchBookingSettings()
			this.originalBookingSettings = this.bookingSettings
		},
		getFormattedDate (selfDate) {
			const date = new Date(selfDate);
			const day = date.getDate();
			const month = date.getMonth();
			const year = date.getFullYear();

			const monthNames = [
			  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
			  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
			];

			return `${day} ${monthNames[month]} ${year}`;
		},
		updateRules () {
			let rules = []
			this.bookingSettings.forEach(day => {
				day.rules.dayOff
				?	rules.push({
						day: day.name,
						dayOff: day.rules.dayOff
					})
				: rules.push({
						day: day.name,
						startHour: day.rules.startHour,
						endHour: day.rules.endHour,
						interval: day.rules.interval,
						dayOff: day.rules.dayOff
					})
			})
			this.updateBookingRules(rules)
		},
		setExceptionDate () {
			this.exception.dateFrom = this.date.start
			this.exception.dateTo = this.date.end
			console.log()
		},
		addException () {
			console.log(this.exception)
			this.newBookingException(this.exception)
			this.exception = {
      	dateFrom: '',
      	dateTo: '',
      	startHour: '',
      	endHour: '',
      	interval: '',
      	dayOff: false
      }
		},
		deleteException (day, id) {
			this.removeBookingException({ day: day, exception: id })
		}
	}
}
</script>
<style lang="scss" scoped>
.sectionTitle {
  font-family: var(--font-family-primary);
  font-weight: var(--font-medium);
  font-size: var(--font-lg);
  margin: var(--spacer-xs) 0;
  padding: var(--spacer-xs) 0;
  border-bottom: 1px solid var(--c-primary);
  width: 100%;
  &:not(:first-child) {
  	margin: var(--spacer-lg) 0 var(--spacer-xs);
  }
}
.m-product-carousel {
	max-width: 100%;
}
.o-my-account-booking-settings {
	display: flex;
	flex-wrap: wrap;
}
.day {
	// flex: 1 1 15rem;
	// max-width: 15rem;
	transition: .3s ease;
	&__disabled {
		border: 1px solid var(--c-danger);
	}
	margin: var(--spacer-xs);
	border: 1px solid var(--c-primary);
	border-radius: 15px;
	overflow: hidden;
	span {
		display: block;
		font-size: var(--font-sm);
		font-weight: var(--font-medium);
		margin-top: .75rem;
	}
	&__title {
		padding: .75rem  var(--spacer-lg);
		background: var(--c-primary);
		color: var(--c-white);
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		transition: .3s ease;
		h3 {
			margin: 0;
			font-family: var(--font-family-secondary);
			text-transform: uppercase;
			font-size: var(--font-base);
		}
		&--disabled {
			background: var(--c-danger);
		}
		&--checkbox {
			margin: .75rem 0 var(--spacer-sm);
			// --checkbox-background: var(--c-white);
			--checkbox-border: 2px solid var(--c-text);
			--checkbox-border-radius: 5px;
			--checkbox-size: 1.25rem;
			--checkbox-font-family: var(--font-family-primary);
			--checkbox-font-weight: var(--font-medium);
			--checkbox-font-size: var(--font-sm);
			--checkbox-label-margin: 0 0 0 var(--spacer-xs);
		}
	}
	&__form {
		padding: var(--spacer-xs) var(--spacer-lg);
		transition: .3s ease;
		&--disabled {
			background: var(--c-light-darken);
		}
		&--input {
			&-half {
				flex: 1 1 100%;
				max-width: 100%;
			}
			flex: 1 1 100%;
			max-width: 100%;
			margin: .75rem 0;
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
					padding: .75rem var(--spacer-sm) .75rem var(--spacer-sm);
					width: 100%;
				}
				img {
					position: absolute;
					width: .9rem;
					height: .9rem;
					top: .95rem;
					left: .75rem;
					object-fit: cover;
				}
				&-half {
					width: calc(100% - 2rem - 4px - 1rem);
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
.relative {
	position: relative;
}
.note {
	font-size: var(--font-2xs);
  font-weight: var(--font-normal);
  margin: 0;
  font-family: var(--font-family-secondary);
  line-height: 1;
  position: absolute;
  bottom: -0.45rem;
  width: 10rem;
}
.update {
	font-family: var(--font-family-secondary);
  font-weight: var(--font-semibold);
  outline: none;
  border: none;
  border-radius: 8px;
  background: var(--c-primary);
  color: var(--c-white);
  cursor: pointer;
  padding: 0.75rem;
  margin: var(--spacer-sm) var(--spacer-xs) 0;
  width: 100%;
  transition: .3s ease;
	&__disabled {
		background: var(--c-gray);
	}
	&__marginFix {
		margin: var(--spacer-sm) 0 0;
	}
}
.containerFlex {
	display: flex;
	width: 100%;
}
.rightMargin {
	margin-right: var(--spacer-sm);
}
.leftMargin {
	margin-left: var(--spacer-sm);
}
.labelInput {
	font-size: var(--font-sm);
  font-weight: var(--font-medium);
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
.widthFix {
	width: calc(100% - 1rem) !important;
}
.exception {
	background: var(--c-light);
	padding: var(--spacer-2xs) var(--spacer-xs);
	margin: var(--spacer-2xs) 0;
	position: relative;
	&__container {
		margin: var(--spacer-sm);
		h4 {
			font-family: var(--font-family-primary);
			font-size: var(--font-sm);
			margin: 0 0 var(--spacer-xs);
			border-bottom: 1px solid var(--c-primary);
		}
		p {
			margin: 0;
			font-family: var(--font-family-primary);
			font-size: var(--font-xs);
			font-weight: var(--font-normal);
			line-height: 1.4;

			b {
				margin-right: var(--spacer-2xs);
			}
		}
	}
	&__delete {
		position: absolute;
		top: .4rem;
		right: var(--spacer-xs);
		width: .75rem;
		height: .75rem;
		filter: invert(25%) sepia(29%) saturate(3513%) hue-rotate(334deg) brightness(100%) contrast(111%);
		cursor: pointer;
	}
}
.dayOff {
	color: var(--c-danger-darken);
}
</style>