<template>
	<div class="my-account page">
		<SfContentPages
      title="My Account"
      :active="activePage"
      class="my-account__content"
      @click:change="changeActivePage"
    >
      <SfContentCategory :title="$t('Personal Details')">
        <SfContentPage :title="$t('My profile')">
          <OMyAccountProfile />
        </SfContentPage>
        <SfContentPage :title="$t('Employees')">
          <OMyAccountEmployees />
        </SfContentPage>
      </SfContentCategory>
      <SfContentCategory :title="$t('Bookings')">
        <SfContentPage :title="$t('All Bookings')">
          <OMyAccountAdminBookings />
        </SfContentPage>
        <SfContentPage :title="$t('My Bookings')">
          <OMyAccountPersonalBookings />
        </SfContentPage>
        <SfContentPage :title="$t('Booking Settings')">
          <OMyAccountBookingSettings />
        </SfContentPage>
      </SfContentCategory>
      <SfContentCategory :title="$t('Blog Section')">
      	<SfContentPage :title="$t('Blog')">
          <OMyAccountBlog />
        </SfContentPage>
      </SfContentCategory>
      <SfContentCategory :title="$t('Other')">
      	<SfContentPage :logout="true" :title="$t('Log out')" />
      </SfContentCategory>
    </SfContentPages>
	</div>
</template>
<script>
import { SfContentPages } from '@storefront-ui/vue'
import OMyAccountProfile from '@/components/organisms/o-my-account-profile'
import OMyAccountEmployees from '@/components/organisms/o-my-account-employees'
import OMyAccountAdminBookings from '@/components/organisms/o-my-account-admin-bookings'
import OMyAccountPersonalBookings from '@/components/organisms/o-my-account-personal-bookings'
import OMyAccountBookingSettings from '@/components/organisms/o-my-account-booking-settings'
import OMyAccountBlog from '@/components/organisms/o-my-account-blog'

export default {
	components: {
		SfContentPages,
		OMyAccountProfile,
		OMyAccountEmployees,
		OMyAccountAdminBookings,
		OMyAccountPersonalBookings,
		OMyAccountBookingSettings,
		OMyAccountBlog
	},
	data () {
		return {
  	  activePage: 'My profile'
		}
	},
	methods: {
		changeActivePage (title) {
      if (title === 'Log out') {
        this.logout();
        return;
      }
      this.activePage = title;
    }
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.my-account {
	padding: 96px var(--spacer-xl);
	margin: 0 auto;
	max-width: 1272px;
	@include for-mobile {
		padding: 84px var(--spacer-sm);
	}
}
</style>