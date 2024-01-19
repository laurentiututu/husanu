<template>
	<div class="loans page">
		<section class="insurance-section" ref="#company-insurances">
			<MSectionHeader class="header" title="Loans in Germany" />
			<div class="companyAdvantages">
				<div class="blurOverlay mobile-only" />
				<div class="companyPerks__container companyAdvantages__section indexFix">
					<div class="companyPerks__title">
						<h4>{{ $t('What We Offer') }}</h4>
					</div>
					<div class="companyPerks">
						<MPerk v-for="(perk, i) in offers" :key="i" :perk="perk" class="companyPerks__perk" />
					</div>
				</div>
				<div class="companyAdvantages__cover companyAdvantages__section">
					<img src="@/assets/images/offer_sm.jpg">
				</div>
			</div>
			<div class="companyAdvantages">
				<div class="blurOverlay mobile-only" />
				<div class="companyAdvantages__cover companyAdvantages__section">
					<img src="@/assets/images/walk_sm.jpg">
				</div>
				<div class="companyPerks__container companyAdvantages__section indexFix">
					<div class="companyPerks__title">
						<h4>{{ $t('Top Advantages') }}</h4>
					</div>
					<div class="companyPerks">
						<MPerk v-for="(perk, i) in advantages" :key="i" :perk="perk" class="companyPerks__perk" />
					</div>
				</div>
			</div>
		</section>
		<section class="insurance-section" ref="#how-it-works">
      <MSectionHeader class="header" title="How it Works" />
      <MSteps :steps="steps" class="steps" />
		</section>
		<section class="insurance-section" ref="faq">
			<MSectionHeader class="header" title="Why Us?" />
      <OServices :services="services" title="Frequently Asked Questions" :link="false" />
		</section>
	</div>
</template>
<script>
import MPerk from '@/components/molecules/m-perk'
import MSectionHeader from '@/components/molecules/m-section-header'
import MSteps from '@/components/molecules/m-steps'
import OServices from '@/components/organisms/o-services'

export default {
	components: {
		MPerk,
		MSectionHeader,
		MSteps,
		OServices
	},
	data () {
		return {
			steps: [
        {
          title: '1. Necessary Documents',
          list: [
          	'ID / Passport',
          	'Employment contract in Germany',
          	'Last 3 pay slips',
          	'Account statement for the last 3 months'
          ],
          image: require('@/assets/icons/consultation.png')
        },
        {
          title: '2. Analyze',
          description: 'In no more than 24 hours we analyze the data from all the documents sent by you and invite you to sign the loan documents.',
          image: require('@/assets/icons/task.png')
        },
        {
          title: '3. Loan Approved',
          description: 'Sign the documents and receive the money in your account. It has never been simpler!',
          image: require('@/assets/icons/deal.png')
        },
        // {
        //   title: '4. System Design & Automation',
        //   description: 'You can customise your insurance policy and choose to safeguard exactly what you want.',
        //   image: require('@/assets/icons/family.png')
        // }
      ],
			offers: [
				{
					icon: require('@/assets/icons/loan.png'),
					description: 'Private loan',
					note: 'From 1.49% p.a.'
				},
				{
					icon: require('@/assets/icons/refinancing.png'),
					description: 'Loan Refinance',
					note: 'From 1.49% p.a.'
				},
				{
					icon: require('@/assets/icons/car-loan.png'),
					description: 'Car Loan',
					note: 'From 1.49% p.a.'
				},
				{
					icon: require('@/assets/icons/vacation.png'),
					description: 'Travel Loan',
					note: 'From 1.49% p.a.'
				},
				{
					icon: require('@/assets/icons/sofa.png'),
					description: 'Furniture Loan',
					note: 'From 1.49% p.a.'
				},
				{
					icon: require('@/assets/icons/leisure.png'),
					description: 'Modernization Loan',
					note: 'From 1.49% p.a.'
				}
			],
			advantages: [
				{
					icon: require('@/assets/icons/interest-rate.png'),
					description: 'Interest from 1.49% p.a.'
				},
				{
					icon: require('@/assets/icons/calendar.png'),
					description: 'Individual term 6 - 120 months'
				},
				{
					icon: require('@/assets/icons/loan_2.png'),
					description: 'Loan up to 80.000 euros'
				},
				{
					icon: require('@/assets/icons/process.png'),
					description: 'Payment break once a year'
				},
				{
					icon: require('@/assets/icons/money-back.png'),
					description: 'Full refund at any time'
				},
				{
					icon: require('@/assets/icons/shield-2.png'),
					description: 'Credit insurance *',
					note: 'Optional'
				}
			],
			services: [
        {
          name: 'Why should I call you when I can go to the bank directly to obtain a loan?',
          content: {
            title: 'Because we:',
            list: [
            	'Before making a credit request, we check the documents.',
            	'If your documents are not in order, we will tell you and prepare you for later.',
            	'We do not charge commissions from our clients.',
            	'We are authorized to grant private loans.',
            	'We explain all the details in Romanian.',
            	'We can negotiate a much better interest rate with the bank. ',
            	'There is no difference from a legal point of view between us as financial advisors and the employees of any bank.',
            	'We work with several banks to get you the best interest rate '
            ]
          }
        },
        {
          name: 'How much commission do I have to pay to get a loan?',
          content: {
            title: 'How much commission do I have to pay to get a loan?',
            list: [
            	'We do not charge commissions from our clients.',
            	'We are paid exactly like the employees of any bank for our time and services by the bank that will grant you the loan.'
            ]
          }
        },
        {
          name: 'How can I send the documents to get an offer?',
          content: {
          	title: 'How can I send the documents to get an offer?',
          	list: [
          		'You can send the documents in the first phase by post or you can come directly to our office in Dreieich.',
          		'Instead, if we get an offer and you agree, we must set up a face-to-face appointment to identify and verify the originality of all the documents required for the loan. '
          	]
          }
        },
        {
          name: 'How old do I have to be at my current job?',
          content: {
            title: 'How old do I have to be at my current job?',
            list: [
            	'In general, you must have at least one year of experience at your current job',
            	'BUT',
            	'In some cases, it is also accepted if you have been at your current job for 6 months',
            	'We can explain all the details and analyze your exact situation if you contact us by phone or email.'
            ]
          }
        },
        {
        	name: 'If I took a loan for two months, can I refinance?',
        	content: {
        		title: 'If I took a loan for two months, can I refinance?',
        		list: [
        			'In general, at least 6 months must pass for a refinancing',
        			'BUT',
        			'In some cases, a refinancing is accepted if your creditworthiness is very good.',
        			'We can explain all the details and analyze your exact situation if you contact us by phone or email.'
        		]
        	}
        },
        {
        	name: 'If I have negative entries in SCHUFA, can you grant me a loan?',
        	content: {
        		title: 'If I have negative entries in SCHUFA, can you grant me a loan?',
        		list: [
        			'If you have a low credit rating or negative records in SCHUFA, we will not be able to help you access a personal loan in Germany',

        		]
        	}
        },
        {
        	name: 'What documents do I need for a personal loan in Germany?',
        	content: {
        		title: 'Required documents:',
        		list: [
        			'Copy of report card/passport',
        			'Last 3 pay slips',
        			'Account statements for the last 3 months',
        			'Indefinite employment contract or certificate from the employer that you have an indefinite employment contract',
        			'Anmeldung – Proof of residence registration at the town hall'
        		]
        	}
        },
        {
        	name: 'What documents do I need to refinance an existing loan in Germany?',
        	content: {
        		title: 'Required documents:',
        		list: [
        			'Copy of current credit agreement',
        			'Copy of report card/passport',
        			'Last 3 pay slips',
        			'Account statements for the last 3 months',
        			'Indefinite employment contract or certificate from the employer that you have an indefinite employment contract',
        			'Anmeldung – Proof of residence registration at the town hall'
        		]
        	}
        }
      ]
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.loans {
	padding: 96px var(--spacer-xl);
	margin: 0 auto;
	max-width: 1272px;
	@include for-mobile {
		padding: 84px var(--spacer-sm);
	}
}
.header {
	&::v-deep .title {
		text-align: center;
	}
// 	&::v-deep .a-divider {
// 		margin: var(--spacer-xl) 0;
// 	}
// 	&::v-deep .description {
// 		margin: 0;
// 	}
}
.companyAdvantages {
	display: flex;
	justify-content: space-between;
	margin: var(--spacer-2xl) 0;
	@include for-mobile {
		position: relative;
		&:last-child {
			margin-bottom: 0;
		}
	}
	&__section {
		@include for-mobile {
			padding: var(--spacer-sm) !important;
		}
		&:first-child {
			@include for-desktop {
				margin-right: var(--spacer-2xl);
			}
		}
	}
	&__cover {
		position: relative;
		width: 10rem;
		flex: 1 1 60%;
		border-radius: 25px;
		overflow: hidden;
		img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			@include for-mobile {
				bottom: 0;
				height: 100%;
			}
		}
		@include for-mobile {
			position: absolute;
			width: calc(100% - 2rem);
			flex: 1 1 100%;
			top: 0;
			height: calc(100% - 2rem);
			border-radius: 15px;
		}
	}
}
.companyPerks {
	display: flex;
	flex-wrap: wrap;
	&__container {
		flex: 1 1 40%;
		padding: var(--spacer-sm) 0;
	}
	&__title {
		h4 {
			margin: 0 0 var(--spacer-sm);
	    font-family: var(--font-family-secondary);
	    font-weight: var(--font-bold);
	    font-size: 1.5rem;
	    border-bottom: 2px solid var(--c-primary);
	    padding: 0 0 var(--spacer-sm);
		}
	}
	&__perk {
		flex: 1 1 calc(50% - 2rem);
    max-width: calc(50% - 2rem);
    padding: var(--spacer-lg) var(--spacer-sm);
	}
	&__sidenote {
		display: block;
		font-family: var(--font-family-secondary);
		font-size: var(--font-xs);
		color: var(--c-gray-lighten);
		padding: var(--spacer-sm);
		text-align: center;
	}
}
.companyInsurances {
	display: flex;
	flex-wrap: wrap;

	&__card {
		margin: var(--spacer-sm);
		flex: 1 1 calc(25% - 2rem - 2px);
		min-height: 10rem;
		// max-width: calc(25% - 2rem - 2px);
		height: 34rem;
	}
}
.steps {
	&::v-deep .perk__content {
		max-width: 14rem;
	}
}
.insurance-section {
	padding: var(--spacer-2xl) 0;
	@include for-mobile {
		padding: var(--spacer-xl) 0;
	}
}
.indexFix {
	@include for-mobile {
		z-index: 2;
	}
}
.blurOverlay {
	z-index: 1;
	position: absolute;
	background: rgba(255, 255, 255, .75);
	backdrop-filter: blur(2px);
	width: 100%;
	height: 100%;
	border-radius: 15px;
}
</style>