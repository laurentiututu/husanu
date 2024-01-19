<template>
  <div class="home page">
    <OHeroStatic />

    <div class="section">
      <MSectionHeader title="Our Services" :subtitle="true" :description="description" />
      <OServices :services="services" />
    </div>

    <div class="section">
      <MSectionHeader title="How it Works" />
      <MSteps :steps="steps" />
    </div>
    <div class="section">
      <MSectionHeader title="Our Team" :description="description" />
      <div class="team">
        <MMemberCard v-for="(member, i) in members" :key="i" :member="member" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MSectionHeader from '@/components/molecules/m-section-header.vue'
import MSteps from '@/components/molecules/m-steps.vue'
import MMemberCard from '@/components/molecules/m-member-card.vue'
import OHeroStatic from '@/components/organisms/o-hero-static.vue'
import OServices from '@/components/organisms/o-services.vue'

export default {
  name: 'Home',
  components: {
    MSectionHeader,
    MSteps,
    MMemberCard,
    OHeroStatic,
    OServices
  },
  data () {
    return {
      description: 'A modern CPA firm that is your catalyst to actionable insights, dedicated support, and transparent reporting so you can meet and exceed your financial goals.',
      steps: [
        {
          title: '1. Analyze',
          description: 'We analyze the current situation and future wishes.',
          image: require('@/assets/icons/consultation.png')
        },
        {
          title: '2. Solutions',
          description: 'We offer you solutions strictly based on your wishes and needs.',
          image: require('@/assets/icons/task.png')
        },
        {
          title: '3. Partnership',
          description: 'We become your long-term financial partner.',
          image: require('@/assets/icons/deal.png')
        },
        // {
        //   title: '4. System Design & Automation',
        //   description: 'You can customise your insurance policy and choose to safeguard exactly what you want.',
        //   image: require('@/assets/icons/family.png')
        // }
      ],
      services: [
        {
          name: 'Personal Insurance',
          children: [
            {
              title: 'Health in Germany',
              description: "You can customise your insurance policy and choose to safeguard exactly what you want. We'll take care of the rest.",
              icon: require('@/assets/icons/health-care.png')
            },
            {
              title: 'Complete Protection in Germany',
              description: 'asdf',
              icon: require('@/assets/icons/shield.png')
            },
            {
              title: 'Alimony in Germany',
              description: 'asdf',
              icon: require('@/assets/icons/alimony.png')
            },
            {
              title: 'House, Life and Leisure in Germany',
              description: 'asdf',
              icon: require('@/assets/icons/leisure.png')
            }
          ],
          seeMore: true
        },
        {
          name: 'Company Insurance',
          content: {
            title: 'Company Insurance',
            description: "You can customise your insurance policy and choose to safeguard exactly what you want. We'll take care of the rest. You can customise your insurance policy and choose to safeguard exactly what you want. We'll take care of the rest. You can customise your insurance policy and choose to safeguard exactly what you want. We'll take care of the rest. You can customise your insurance policy and choose to safeguard exactly what you want. We'll take care of the rest."
          }
        },
        {
          name: 'Loans in Germany',
          children: [
            {
              title: 'Private Loan',
              description: 'asdf',
              icon: require('@/assets/icons/loan.png')
            },
            {
              title: 'Loan Refinancing',
              description: 'asdf',
              icon: require('@/assets/icons/refinancing.png')
            },
            {
              title: 'Car Loan',
              description: 'asdf',
              icon: require('@/assets/icons/car-loan.png')
            },
            {
              title: 'Vacation Loan',
              description: 'asdf',
              icon: require('@/assets/icons/vacation.png')
            }
          ],
          seeMore: false
        },
        {
          name: 'Investments',
          content: {
            title: 'Investments',
            description: 'asdf'
          }
        }
      ],
      members: [
        {
          name: 'John',
          role: 'Founder and CEO',
          description: "Lorem Ipsum is a simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Industry's standard dummy text ever since the 1500s.",
          image: require('@/assets/team/john.jpg')
        },
        {
          name: 'Milan',
          role: 'Lead Developer',
          description: "Lorem Ipsum is a simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Industry's standard dummy text ever since the 1500s.",
          image: require('@/assets/team/milan.jpg')
        },
        {
          name: 'Smith',
          role: 'Marketing Executive',
          description: "Lorem Ipsum is a simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Industry's standard dummy text ever since the 1500s.",
          image: require('@/assets/team/smith.jpg')
        },
        {
          name: 'Natasha',
          role: 'Senior Designer',
          description: "Lorem Ipsum is a simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Industry's standard dummy text ever since the 1500s.",
          image: require('@/assets/team/natasha.jpg')
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.section {
  max-width: 1272px;
  margin: 0 auto;
  text-align: center;
  padding: var(--spacer-2xl) var(--spacer-xl);
  border-bottom: 1px solid var(--c-light);
  @include for-mobile {
    padding: var(--spacer-xl) var(--spacer-lg);
  }
}

.team {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: var(--spacer-2xl);
}
</style>
