<template>
	<div class="investments page">
		<section class="section">
			<MSectionHeader
				class="header"
				title="Invest today for a more prosperous future"
				description="Savings plans can be used to build substantial wealth. From only 25 euros per month. You remain completely flexible, both in choosing the fund and in terms of savings rates and term."
			/>
      <MSteps :steps="characteristics" class="steps" />
      <div class="quote">
      	<h4 class="quote__title">{{ $t(quote.title) }}</h4>
      	<p class="quote__description">{{ $t(quote.description) }}</p>
      </div>
		</section>
	</div>
</template>
<script>
import MSectionHeader from '@/components/molecules/m-section-header'
import MSteps from '@/components/molecules/m-steps'

export default {
	components: {
		MSectionHeader,
		MSteps
	},
	data () {
		return {
			quote: {
				title: "Use the average cost effect:",
				description: "If an investment account's savings rate remains constant over the long term, depending on the fund's price development, fewer shares will be purchased at higher prices and more shares at lower prices. In this way, investors can take advantage of price fluctuations to achieve a cheaper average starting price over the long term than if they regularly buy a fixed number of shares over the same period. This method is particularly recommended for equity fund investments."
			},
			characteristics: [
        {
          title: 'Regular Savings',
          description: 'Invest in top funds using the cost averaging effect.',
          image: require('@/assets/icons/save-money.png')
        },
        {
          title: 'Low Minimum Savings Rate',
          description: 'You can implement yuor savings plan from just 25 euros per month.',
          image: require('@/assets/icons/deposit.png')
        },
        {
          title: 'High Flexibility',
          description: 'You can choose from numerous options for your individual goals.',
          image: require('@/assets/icons/provision.png')
        },
        // {
        //   title: '4. System Design & Automation',
        //   description: 'You can customise your insurance policy and choose to safeguard exactly what you want.',
        //   image: require('@/assets/icons/family.png')
        // }
      ]
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.investments {
	padding: 96px var(--spacer-xl);
	margin: 0 auto;
	max-width: 1272px;
	@include for-mobile {
		padding: 84px var(--spacer-sm);
	}
	.header {
		text-align: center;
	}
}
.section {
	padding: var(--spacer-2xl) 0;
}
.steps {
	&::v-deep .perk__content {
		max-width: 14rem;
	}
}
.quote {
  display: block;
  margin: var(--spacer-xl) 0 0;
  padding: 0.75rem var(--spacer-sm);
  border-left: 4px solid var(--c-primary);
  font-family: var(--font-family-secondary);
  font-size: .85rem;
	&__title {
		font-weight: var(--font-bold);
		margin: 0 0 var(--spacer-xs);
	}
	&__description {
		font-weight: var(--font-normal);
		margin: 0;
	}
}
</style>