<template>
	<div class="personal-insurance page">
		<!-- <div class="insurance-section">
			<MSectionHeader class="header" title="Health in Germany" />
			<div class="products">
				<MProductCard
					v-for="(insurance, i) in healthInsurances"
					:key="i"
					:product="insurance"
					class="products__card"
				/>
			</div>
		</div> -->
		<section class="insurance-section" ref="#personal-insurance">
			<MSectionHeader class="header" title="Personal Insurances" />
			<OAccordionMenu :menu="personalInsurances" />
		</section>
		<section class="insurance-section" ref="#business-insurance">
			<MSectionHeader class="header" title="Company Insurances" :description="companyInsurancesDescription" />
			<div class="companyAdvantages">
				<div class="companyAdvantages__cover companyAdvantages__section">
					<img src="@/assets/images/handshake_sm.jpg">
				</div>
				<div class="companyPerks__container companyAdvantages__section">
					<div class="companyPerks__title">
						<h4>{{ $t('Top Advantages') }}</h4>
					</div>
					<div class="companyPerks">
						<MPerk v-for="(perk, i) in perks" :key="i" :perk="perk" class="companyPerks__perk" />
					</div>
					<span class="companyPerks__sidenote">{{ $t('* Damages up to 20% of the insured sum up to a maximum of 1 million Euros') }}</span>
				</div>
			</div>
			<div class="companyInsurances__container">
				<div class="companyPerks__title">
					<h4>{{ $t('What Includes') }}</h4>
				</div>
				<SfCarousel
			    class="m-product-carousel"
			    :settings="carouselSettings"
			    :key="companyInsurances.length"
			    :defaultColor="true"
			  >
			    <SfCarouselItem v-for="(card, i) in companyInsurances" :key="i">
			      <MInfoCardVertical :product="card" class="companyInsurances__card" />
			    </SfCarouselItem>
			  </SfCarousel>
				<!-- <div class="companyInsurances">
					<MInfoCardVertical
						v-for="(card, i) in companyInsurances"
						:key="i"
						:product="card"
						class="companyInsurances__card"
					/>
				</div> -->
			</div>
			<div class="companyAdvantages">
				<div class="companyPerks__container companyAdvantages__section">
					<div class="companyPerks__title">
						<h4>{{ $t('Additional Bonuses and Discounts') }}</h4>
					</div>
					<div class="companyPerks">
						<MPerk v-for="(perk, i) in bonuses" :key="i" :perk="perk" class="companyPerks__perk" />
					</div>
				</div>
				<div class="companyAdvantages__cover companyAdvantages__section">
					<img src="@/assets/images/bonuses_sm.jpg">
				</div>
			</div>
			<div class="generalInfo">
				<MInfoCarousel :info="basicInfo" />
			</div>
		</section>
	</div>
</template>
<script>
import MSectionHeader from '@/components/molecules/m-section-header'
// import MProductCard from '@/components/molecules/m-product-card'
import OAccordionMenu from '@/components/organisms/o-accordion-menu'
import MPerk from '@/components/molecules/m-perk'
import MInfoCarousel from '@/components/molecules/m-info-carousel'
import MInfoCardVertical from '@/components/molecules/m-info-card-vertical'
import { SfCarousel } from '@storefront-ui/vue';

export default {
	components: {
		MSectionHeader,
		// MProductCard,
		OAccordionMenu,
		MPerk,
		MInfoCarousel,
		MInfoCardVertical,
		SfCarousel
	},
	data () {
		return {
			carouselSettings: {
        animationDuration: 400,
        rewind: true,
        slidePerPage: false,
        perView: 4,
        peek: {
        	before: 0,
        	after: 40
        },
        breakpoints: {
          768: {
            perView: 1,
            peek: {
              before: 30,
              after: 30,
            },
          }
        }
			},
			companyInsurancesDescription: 'Cu polita de protectie corporativă (USP), facilităm clienții noștri comerciali. USP este o politică de pachete cu un nivel de performanță de top și un raport preț / performanță excepțional pentru aproape toate modurile și dimensiunile de operare.',
			personalInsurances: [
				{
					name: 'Health Insurance in Germany',
					slug: 'health-in-germany',
					icon: require('@/assets/icons/health-care.png'),
					children: [
						{
							title: 'Statutory Health Insurance',
							slug: 'statutory-health-insurance',
							data: [
								// {
								// 	type: 'subtitle',
								// 	content: 'This is a subtitle'
								// },
								{
									type: 'description',
									content: 'Since 2009, every person who has a permanent place of residence in Germany is required to have health insurance.'
								},
								{
									type: 'description',
									content: 'Health insurance is also required for short stays.'
								},
								{
									type: 'description',
									content: 'BKK Linde was founded in 1952 as statutory health insurance for the international technology group Linde AG in order to offer its employees first-class insurance.'
								},
								{
									type: 'description',
									content: 'Since 2007, BKK Linde has been a health insurance company open to all customers who want high-quality health insurance that stands for health, prevention, protection and security.'
								},
								{
									type: 'description',
									content: 'Here are some of the special benefits that BKK Linde offers:'
								},
								{
									type: 'list',
									content: [
										'Basic health insurance: BKK Linde offers basic medical insurance that covers doctor visits, hospital stays, medication and other necessary medical services.',
										'Dental insurance: BKK Linde offers dental insurance that includes check-ups, teeth cleaning, fillings and other necessary dental services.',
										'Medicines insurance: BKK Linde offers medicines insurance that covers the necessary prescription and non-prescription medicines.',
										'Wellness Programs: BKK Linde offers a range of wellness programs to help members improve their health and well-being.',
										'Medical Advice: BKK Linde offers medical advice services to help members make informed decisions about their health.',
										'Travel assistance: BKK Linde offers travel assistance, which makes it easier for members to access medical services abroad.',
										'Hospital Pre-Reservation Services: BKK Linde offers hospital pre-reservation services to help members find hospital space when they need it.',
										'Home Support Services: BKK Linde offers home support services to help members stay safe and healthy at home.',
										'Child Care Services: BKK Linde offers child care services that help members work or study while their children are cared for.'
									]
								},
								{
									type: 'description',
									content: 'The BKK Linde offers a number of additional advantages'
								},
								{
									type: 'description',
									content: 'Discounts on medical services and medicines'
								},
								{
									type: 'description',
									content: 'Free health and fitness programs'
								},
								{
									type: 'description',
									content: 'Emergency assistance'
								},
								{
									type: 'description',
									content: 'Help in case of illness or accident'
								},
								{
									type: 'note',
									content: 'If you would like to know more about BKK Linde, please contact an advisor.'
								},
								// {
								// 	type: 'image',
								// 	content: require('@/assets/images/bg-advisory.jpg')
								// }
							]
						},
						{
							title: 'Private Health Insurance',
							slug: 'private-health-insurance',
							data: [
								// {
								// 	type: 'subtitle',
								// 	content: 'This is a subtitle'
								// },
								{
									type: 'description',
									content: 'With comprehensive private health insurance, you choose high-quality health protection with excellent medical care.'
								},
								{
									type: 'description',
									content: 'According to statistics, around 6 million people are insured with state health insurance companies, and approximately 120 thousand people change their health insurance from state to private per year.'
								},
								{
									type: 'description',
									content: 'Private health insurance covers'
								},
								{
									type: 'list',
									content: [
										'Private medical services and free choice of doctor',
										'Alternative doctor benefits from 500 to 1500 Euto in two calendar years depending on the insurance plan',
										'Choosing a reyerve at a hospital',
										'They benefit from dental braces, dental crowns or the reimbursement of additional forms of care',

									]
								},
								{
									type: 'description',
									content: 'Since 2007, BKK Linde has been a health insurance company open to all customers who want high-quality health insurance that stands for health, prevention, protection and security.'
								},
								{
									type: 'description',
									content: 'Here are some of the special benefits that BKK Linde offers:'
								},
								{
									type: 'list',
									content: [
										'Basic health insurance: BKK Linde offers basic medical insurance that covers doctor visits, hospital stays, medication and other necessary medical services.',
										'Dental insurance: BKK Linde offers dental insurance that includes check-ups, teeth cleaning, fillings and other necessary dental services.',
										'Medicines insurance: BKK Linde offers medicines insurance that covers the necessary prescription and non-prescription medicines.',
										'Wellness Programs: BKK Linde offers a range of wellness programs to help members improve their health and well-being.',
										'Medical Advice: BKK Linde offers medical advice services to help members make informed decisions about their health.',
										'Travel assistance: BKK Linde offers travel assistance, which makes it easier for members to access medical services abroad.',
										'Hospital Pre-Reservation Services: BKK Linde offers hospital pre-reservation services to help members find hospital space when they need it.',
										'Home Support Services: BKK Linde offers home support services to help members stay safe and healthy at home.',
										'Child Care Services: BKK Linde offers child care services that help members work or study while their children are cared for.'
									]
								},
								{
									type: 'description',
									content: 'The BKK Linde offers a number of additional advantages'
								},
								{
									type: 'description',
									content: 'Discounts on medical services and medicines'
								},
								{
									type: 'description',
									content: 'Free health and fitness programs'
								},
								{
									type: 'description',
									content: 'Emergency assistance'
								},
								{
									type: 'description',
									content: 'Help in case of illness or accident'
								},
								{
									type: 'note',
									content: 'If you would like to know more about BKK Linde, please contact an advisor.'
								},
								// {
								// 	type: 'image',
								// 	content: require('@/assets/images/bg-advisory.jpg')
								// }
							]
						},
						{
							title: 'Private Dental Insurance',
							slug: 'private-dental-insurance',
							data: [
								// {
								// 	type: 'subtitle',
								// 	content: 'This is a subtitle'
								// },
								{
									type: 'description',
									content: 'Since 2009, every person who has a permanent place of residence in Germany is required to have health insurance.'
								},
								{
									type: 'description',
									content: 'Health insurance is also required for short stays.'
								},
								{
									type: 'description',
									content: 'BKK Linde was founded in 1952 as statutory health insurance for the international technology group Linde AG in order to offer its employees first-class insurance.'
								},
								{
									type: 'description',
									content: 'Since 2007, BKK Linde has been a health insurance company open to all customers who want high-quality health insurance that stands for health, prevention, protection and security.'
								},
								{
									type: 'description',
									content: 'Here are some of the special benefits that BKK Linde offers:'
								},
								{
									type: 'list',
									content: [
										'Basic health insurance: BKK Linde offers basic medical insurance that covers doctor visits, hospital stays, medication and other necessary medical services.',
										'Dental insurance: BKK Linde offers dental insurance that includes check-ups, teeth cleaning, fillings and other necessary dental services.',
										'Medicines insurance: BKK Linde offers medicines insurance that covers the necessary prescription and non-prescription medicines.',
										'Wellness Programs: BKK Linde offers a range of wellness programs to help members improve their health and well-being.',
										'Medical Advice: BKK Linde offers medical advice services to help members make informed decisions about their health.',
										'Travel assistance: BKK Linde offers travel assistance, which makes it easier for members to access medical services abroad.',
										'Hospital Pre-Reservation Services: BKK Linde offers hospital pre-reservation services to help members find hospital space when they need it.',
										'Home Support Services: BKK Linde offers home support services to help members stay safe and healthy at home.',
										'Child Care Services: BKK Linde offers child care services that help members work or study while their children are cared for.'
									]
								},
								{
									type: 'description',
									content: 'The BKK Linde offers a number of additional advantages'
								},
								{
									type: 'description',
									content: 'Discounts on medical services and medicines'
								},
								{
									type: 'description',
									content: 'Free health and fitness programs'
								},
								{
									type: 'description',
									content: 'Emergency assistance'
								},
								{
									type: 'description',
									content: 'Help in case of illness or accident'
								},
								{
									type: 'note',
									content: 'If you would like to know more about BKK Linde, please contact an advisor.'
								},
								// {
								// 	type: 'image',
								// 	content: require('@/assets/images/bg-advisory.jpg')
								// }
							]
						},
						{
							title: 'Additional Health Insurance',
							slug: 'supplementary-health-insurance',
							data: [
								// {
								// 	type: 'subtitle',
								// 	content: 'This is a subtitle'
								// },
								{
									type: 'description',
									content: 'Since 2009, every person who has a permanent place of residence in Germany is required to have health insurance.'
								},
								{
									type: 'description',
									content: 'Health insurance is also required for short stays.'
								},
								{
									type: 'description',
									content: 'BKK Linde was founded in 1952 as statutory health insurance for the international technology group Linde AG in order to offer its employees first-class insurance.'
								},
								{
									type: 'description',
									content: 'Since 2007, BKK Linde has been a health insurance company open to all customers who want high-quality health insurance that stands for health, prevention, protection and security.'
								},
								{
									type: 'description',
									content: 'Here are some of the special benefits that BKK Linde offers:'
								},
								{
									type: 'list',
									content: [
										'Basic health insurance: BKK Linde offers basic medical insurance that covers doctor visits, hospital stays, medication and other necessary medical services.',
										'Dental insurance: BKK Linde offers dental insurance that includes check-ups, teeth cleaning, fillings and other necessary dental services.',
										'Medicines insurance: BKK Linde offers medicines insurance that covers the necessary prescription and non-prescription medicines.',
										'Wellness Programs: BKK Linde offers a range of wellness programs to help members improve their health and well-being.',
										'Medical Advice: BKK Linde offers medical advice services to help members make informed decisions about their health.',
										'Travel assistance: BKK Linde offers travel assistance, which makes it easier for members to access medical services abroad.',
										'Hospital Pre-Reservation Services: BKK Linde offers hospital pre-reservation services to help members find hospital space when they need it.',
										'Home Support Services: BKK Linde offers home support services to help members stay safe and healthy at home.',
										'Child Care Services: BKK Linde offers child care services that help members work or study while their children are cared for.'
									]
								},
								{
									type: 'description',
									content: 'The BKK Linde offers a number of additional advantages'
								},
								{
									type: 'description',
									content: 'Discounts on medical services and medicines'
								},
								{
									type: 'description',
									content: 'Free health and fitness programs'
								},
								{
									type: 'description',
									content: 'Emergency assistance'
								},
								{
									type: 'description',
									content: 'Help in case of illness or accident'
								},
								{
									type: 'note',
									content: 'If you would like to know more about BKK Linde, please contact an advisor.'
								},
								// {
								// 	type: 'image',
								// 	content: require('@/assets/images/bg-advisory.jpg')
								// }
							]
						}
					]
				},
				{
					name: 'Complete Protection in Germany',
					slug: 'complete-protection-in-germany',
					icon: require('@/assets/icons/shield-2.png'),
					children: [
						{
							title: 'The Complete Asset Protection Package with Capitalization',
							slug: 'complete-asset-protection'
						},
						{
							title: 'Capitalization and Financial Security Package',
							slug: 'financial-security'
						},
						{
							title: 'The Investment, Health and Safety Plan for Children',
							slug: 'children-safety-plan'
						},
						{
							title: 'The Young and Life Package',
							slug: 'young-life-package'
						},
						{
							title: 'The Young and Drive package',
							slug: 'young-drive-package'
						},
						{
							title: 'The Young and Home package',
							slug: 'young-home-package'
						}
					]
				},
				{
					name: 'Work Protection in Germany',
					slug: 'work-protection-in-germany',
					icon: require('@/assets/icons/helmet.png'),
					children: [
						{
							title: 'Work Disability Insurance',
							slug: 'work-disability-insurance'
						},
						{
							title: 'Vital Functions Protection Insurance',
							slug: 'vital-protection-insurance'
						}
					]
				},
				{
					name: 'Alimony in Germany',
					slug: 'alimony-in-germany',
					icon: require('@/assets/icons/retirement-plan.png'),
					children: [
						{
							title: 'Reister Alimony',
							slug: 'reister-alimony'
						},
						{
							title: 'Company Alimony',
							slug: 'company-alimony'
						},
						{
							title: 'Rürup Alimony (basic)',
							slug: 'rurup-alimony'
						},
						{
							title: 'Private Alimony',
							slug: 'private-alimony'
						},
						{
							title: 'Immediate Alimony',
							slug: 'immediate-alimony'
						}
					]
				},
				{
					name: 'Insurance for Loved Ones',
					slug: 'insurance-for-loved-ones',
					icon: require('@/assets/icons/family-2.png'),
					children: [
						{
							title: 'Life Insurance',
							slug: 'life-insurance'
						},
						{
							title: 'Death Benefit Insurance',
							slug: 'death-insurance'
						}
					]
				},
				{
					name: 'Home, Life and Leisure in Germany',
					slug: 'home-life-leisure-in-germany',
					icon: require('@/assets/icons/leisure.png'),
					children: [
						{
							title: 'Home Insurance',
							slug: 'home-insurance'
						},
						{
							title: 'Insurance of the Glass from the House',
							slug: 'glass-insurance'
						},
						{
							title: 'Construction Insurance',
							slug: 'construction-insurance'
						},
						{
							title: 'Home Owners Insurance',
							slug: 'home-owners-insurance'
						},
						{
							title: 'Civil Liability Insurance for House and Land Owners',
							slug: 'civil-liability-insurance'
						},
						{
							title: 'Insurance of Photovoltaic Panels',
							slug: 'photovoltaic-panels-insurance'
						},
						{
							title: 'Civil Liability Insurance in Case of Damage Caused by Water',
							slug: 'water-damage-insurance'
						},
						{
							title: 'Free Time Insurance',
							slug: 'free-time-insurance'
						},
						{
							title: 'Water Sports Insurance',
							slug: 'water-sports-insurance'
						}
					]
				},
				{
					name: 'Rights and Liability in Germany',
					slug: 'rights-liability-in-germany',
					icon: require('@/assets/icons/liability.png'),
					children: [
						{
							title: 'Lawyer Insurance',
							slug: 'lawyer-insurance'
						},
						{
							title: 'Third Party Liability Insurance',
							slug: 'third-party-liability-insurance'
						},
						{
							title: 'Civil Liability Insurance for Animal Owners',
							slug: 'animal-owners-insurance'
						}
					],
				},
				{
					name: 'Automobiles and Travel in Germany',
					slug: 'automobiles-travel-in-germany',
					icon: require('@/assets/icons/airplane-around-earth.png'),
					children: [
						{
							title: 'Car Insurance',
							slug: 'car-insurance'
						},
						{
							title: 'Travel Insurance',
							slug: 'travel-insurance'
						},
					]
				},
			],
			companyInsurances: [
				{
					title: 'Haftpflichtversicherung',
					subtitle: 'Third party liability insurance',
					list: [
						'Almost no deductibles',
						'Almost no sub-limits',
						'Gradual damage included',
						'Environmental liability and environmental damage insurance included',
						'Co-insurance of tank systems for hazardous substances in water (eg mineral oil up to a total capacity of 50,000 litres)'
					]
				},
				{
					title: 'Sachversicherung',
					subtitle: 'Property insurance',
					list: [
						'No reduction in compensation for damages caused by gross negligence',
						'Compensation for new value in property insurance',
						'Extended storm and theft cover for tables, seating, radiant heaters as well as signs, billboards and lamps',
						'Lightning surge (without excess)',
						'Extension of insurance coverage for relocation to Germany up to three months after the move'
					]
				},
				{
					title: 'Ertragsausfall',
					subtitle: 'Loss of income',
					list: [
						'No reduction in compensation for damages caused by gross negligence',
						'Waiver of insurance'	
					]
				},
				{
					title: 'Glasbruch',
					subtitle: 'Glass insurance',
					list: [
						'Special costs for scaffolding and cranes, removal and installation of things that prevent the insertion of replacement windows (eg protective grilles, bumpers, canopies, etc.)',
						'Renewal of painting, paintings, writings, decorations, light filter varnishes and foils',
						'Removal of damage produced and decorations exposed behind insured windows'
					]
				},
				{
					title: 'Gefahren der Technischen Versicherung',
					subtitle: 'Technical risk',
					list: [
						'No reduction in compensation for damages caused by gross negligence',
						'Employee operating errors',
						'Third party intent',
						'Short circuit',
						'Overload'
					]
				},
				{
					title: 'Werkverkehr',
					subtitle: 'Transport and transportation of goods',
					list: [
						'No reduction in compensation for damages caused by gross negligence',
						'Damage during transport, for example by: accident, force majeure, theft from the means of transport, theft after the means of transport have been broken, embezzlement of the entire means of transport, robbery',
						'Additional door-to-door coverage'
					]
				},
				{
					title: 'Kühlgut -Tiefkühlgut-, Medikamentenverderb',
					subtitle: 'Overturning of frozen products, medicines',
					list: [
						'No reduction in compensation for damages caused by gross negligence',
						'Waiver of insurance',
						'Compensation for replacement value (replacement value)',
						'Corruption due to unexpected failure of public networks',
						'Failure of mechanical cooling devices, leakage of refrigerants'
					]
				}
			],
			perks: [
				{
					icon: require('@/assets/icons/family-2.png'),
					description: 'The assumption of previous insurance benefits.'
				},
				{
					icon: require('@/assets/icons/task.png'),
					description: 'Performance update.'
				},
				{
					icon: require('@/assets/icons/leisure.png'),
					description: 'Negligible serious damage co-insurance in property insurance'
				},
				{
					icon: require('@/assets/icons/loan.png'),
					description: 'Bonus up to 20% USP'
				},
				{
					icon: require('@/assets/icons/shield-2.png'),
					description: 'Immediate closing with differential coverage'
				},
				{
					icon: require('@/assets/icons/leisure.png'),
					description: 'Waiver of underinsurance in property insurance *'
				},
				{
					icon: require('@/assets/icons/liability.png'),
					description: 'Compensation for new value in property insurance'
				}
			],
			bonuses: [
				{
					icon: require('@/assets/icons/loan.png'),
					description: 'Customer bonus between 15%-25%'
				},
				{
					icon: require('@/assets/icons/car-loan.png'),
					description: '10% bonus if you take out compulsory car insurance with Generali'
				},
				{
					icon: require('@/assets/icons/health-care.png'),
					description: '5% bonus if you are insured with BKK Linde - state health insurance'
				},
				{
					icon: require('@/assets/icons/pouch.png'),
					description: '5% extra bonus through VASP'
				},
				{
					icon: require('@/assets/icons/corporate-laws.png'),
					description: '10% discount on lawyer insurance'
				}
			],
			basicInfo: [
				{
					description: 'Insurance from the VSP package is concluded for a period of 5 years.'
				},
				{
					description: 'If the 5th year has passed, the contract is automatically extended by another year until its termination is requested.'
				},
				{
					description: 'The termination of the contract can be done 3 months before the end of each insurance year, but not earlier than 3 years.'
				},
				{
					description: 'The customer can terminate the contract if he leaves Germany. '
				},
				{
					description: "If the customer's monthly fee increases during the term of the contract, then there is a right to terminate the contract for 30 days."
				},
				{
					description: 'The products in the package can be purchased separately. '
				},
				{
					description: 'You are no longer protected if you have late payments. '
				},
				{
					description: 'Payment can be made monthly, quarterly or annually.'
				}
			]
		}
	},
	mounted () {
		this.scrollToSection()
		// window.addEventListener("scroll", this.onScroll)
	},
	beforeDestroy () {
		// window.removeEventListener("scroll", this.onScroll)
	},
	methods: {
		scrollToSection () {
			let section = Object.keys(this.$refs).find(item => item == this.$route.hash)
			let offset = this.$refs[(section)].offsetTop;
			window.scrollTo({
				top: offset - 20,
				behavior: 'smooth'
			});
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.personal-insurance {
	padding: 96px var(--spacer-xl);
	margin: 0 auto;
	max-width: 1272px;
	@include for-mobile {
		padding: 84px var(--spacer-sm);
		width: calc(100% - 2rem);
	}

	.header {
		&::v-deep .title {
			margin: 0;
			font-size: 2.5rem;
		}
		&::v-deep .a-divider {
			margin: var(--spacer-xl) 0;
		}
		&::v-deep .description {
			margin: 0;
		}
	}

	.products {
		display: flex;
		flex-wrap: wrap;
		&__card {
			flex: 1 1 calc(33.33% - 2rem);
			margin: var(--spacer-sm);
			max-height: 16rem;
		}
	}

	.insurance-section {
		padding: var(--spacer-2xl) 0;
		@include for-mobile {
			padding: var(--spacer-xl) 0;
		}
	}
}
.companyAdvantages {
	display: flex;
	justify-content: space-between;
	margin: var(--spacer-2xl) 0;
	@include for-mobile {
		flex-wrap: wrap;
		margin: var(--spacer-xl) 0;
	}
	&__section {
		@include for-desktop {
			&:first-child {
				margin-right: var(--spacer-2xl);
			}
		}
	}
	&__cover {
		@include for-mobile {
			width: 100%;
			height: 10rem;
			flex: 1 1 100%;
			border-radius: 10px;
		}
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
</style>