<template>
	<div class="o-my-account-personal-bookings">
		<SfTable>
			<SfTableHeading>
				<SfTableHeader v-for="(header, i) in headers" :key="i">{{ $t(header) }}</SfTableHeader>
			</SfTableHeading>
			<SfTableRow v-for="(booking, i) in filteredBookings" :key="i">
				<SfTableData>
					<div class="data__container">
						<p>{{ getFormattedDate(booking.date) }}</p>
						<span>{{ `@ ${booking.hour}` }}</span>
					</div>
				</SfTableData>
				<SfTableData>
					<div class="data__container">
						<p>{{ `${booking.firstName} ${booking.lastName}` }}</p>
						<span>{{ booking.email }}</span>
						<div><span>{{ booking.phone }}</span></div>
					</div>
				</SfTableData>
				<SfTableData>
					<span
						class="data__status"
						:class="{
							'data__status--new': booking.status == 'new',
							'data__status--pending': booking.status == 'pending',
							'data__status--accepted': booking.status == 'done',
							'data__status--declined': booking.status == 'refused'
						}"
					>
						{{ booking.status }}
					</span>
				</SfTableData>
				<SfTableData>
					<div class="data__container">
						<p>{{ booking.service }}</p>
						<span>{{ `( ${booking.lang} )` }}</span>
					</div>
				</SfTableData>
				<SfTableData>
					<template v-if="booking.status == 'new'">
						<button
							@click="updateBooking(booking.id, 'done')"
							class="data__action data__action--approve"
						>
							{{ $t('Mark as Done') }}
						</button>
						<button
							@click="updateBooking(booking.id, 'refused')"
							class="data__action data__action--decline"
						>
							{{ $t('Refuse') }}
						</button>
					</template>
					<button v-else-if="booking.status == 'pending'" class="data__action data__action--idle">{{ $t('Waiting for confirmation') }}</button>
					<button v-else class="data__action data__action--idle">{{ $t('No action needed') }}</button>
				</SfTableData>
			</SfTableRow>
		</SfTable>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { SfTable } from '@storefront-ui/vue'

export default {
	components: {
		SfTable
	},
	data () {
		return {
			headers: [ 'Date', 'Client', 'Status', 'Appointment', 'Action' ],
			filteredBookings: [],
			refreshKey: 0
		}
	},
	async mounted () {
		await this.fetchCurrentUser()
		await this.fetchBookings(this.currentUser.id)
		await this.fetchUsers()
		await this.filterBookings()
	},
	computed: {
		...mapGetters({
			currentUser: 'getCurrentUser',
			bookings: 'getBookingsAdmin',
			users: 'getUsersAdmin'
		}),
		currentBookings () {
			this.refreshKey
			return this.bookings
		}
	},
	methods: {
		...mapActions({
			fetchCurrentUser: 'fetchCurrentUser',
			fetchBookings: 'fetchBookings',
			assign: 'assignBooking',
			update: 'updateBooking',
			fetchUsers: 'fetchUsersAdmin'
		}),
		filterBookings () {
			this.filteredBookings = []
			this.currentBookings.forEach(booking => {
				booking.employee
				? booking.assignedEmployee = `${booking.employee.firstName} ${booking.employee.lastName}`
				: booking.assignedEmployee = 'No employee assigned'
				this.filteredBookings.push(booking)
			})
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
		async updateBooking (booking, status) {
			await this.update({ booking: booking, status: status })
			await this.fetchBookings(this.currentUser.id)
			await this.filterBookings()
			this.refreshKey++
		}
	}
}
</script>
<style lang="scss" scoped>
.o-my-account-personal-bookings {
	&::v-deep .sf-table {
		// .sf-table__heading {
		// 	.sf-table__header {
		// 		&:nth-child(:first-child) {
		// 			margin: 0 auto;
		// 			text-align: center;
		// 		}
		// 	}
		// }
		.sf-table__row {
			align-items: center;
		}
	}
}
.data {
	&__container {
		p {
			margin: 0;
	    font-size: var(--font-xs);
	    font-weight: var(--font-medium);
	    color: var(--c-text);
			line-height: 1.2;
		}
		span {
			margin: 0;
	    font-size: var(--font-2xs);
	    font-weight: var(--font-normal);
	    color: var(--c-gray);
			line-height: 1.2;
		}
	}
	&__status {
		display: block;
		text-align: center;
		color: var(--c-white);
    font-size: var(--font-xs);
    padding: var(--spacer-2xs) var(--spacer-xs);
    text-transform: uppercase;
    width: 5rem;
    &--new {
    	background: var(--c-primary-darken);
    }
    &--accepted {
    	background: #4A934A;
    }
    &--pending {
    	background: #C08A3E;
    }
    &--declined {
    	background: #AE423F;
    }
	}
	&__comment {
		font-size: var(--font-xs);
		line-height: 1.2;
		color: var(--c-text);
		font-weight: var(--font-normal);
		margin: 0 var(--spacer-xs) 0 0;
	}
	&__action {
		color: var(--c-white);
    font-size: var(--font-xs);
    padding: var(--spacer-2xs) var(--spacer-xs);
    text-transform: uppercase;
    font-family: var(--font-family-secondary);
    outline: none;
    border: none;
    display: block;
    width: 8rem;
    margin: var(--spacer-2xs) 0;
    opacity: .75;
    cursor: pointer;
    transition: .3s ease;
    text-align: center;
		user-select: none;
    &:hover {
    	opacity: 1;
    }
		&--approve {
    	background: #4A934A;
		}
		&--decline {
    	background: #AE423F;
		}
		&--idle {
			background: var(--c-gray);
			opacity: 1;
			user-select: none;
			cursor: default;
		}
	}
}
.userSelect {
	padding: 0;
	--product-option-font-size: var(--font-sm);
	--select-option-font-size: var(--font-sm);
	--select-option-font: var(--font-sm);
	--select-selected-padding: 0;
}
</style>