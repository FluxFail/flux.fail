<template>
  <div>
    <Hero />
    <Claim />
    <SectionIdea
      :paragraphs="$t('homePage.ideaSection.paragraphs')"
      :pitchDescription="$t('homePage.ideaSection.pitchDescription')"
      :pitchTitle="$t('homePage.ideaSection.pitchTitle')"
      :title="$t('homePage.ideaSection.title')"
    ></SectionIdea>
    <SectionPrivacy
      :paragraphs="$t('homePage.privacySection.paragraphs')"
      :pitchDescription="$t('homePage.privacySection.pitchDescription')"
      :pitchTitle="$t('homePage.privacySection.pitchTitle')"
      :title="$t('homePage.privacySection.title')"
    ></SectionPrivacy>
    <SectionPrivacy
      :paragraphs="$t('homePage.benefitsSection.paragraphs')"
      :pitchDescription="$t('homePage.benefitsSection.pitchDescription')"
      :pitchTitle="$t('homePage.benefitsSection.pitchTitle')"
      :title="$t('homePage.benefitsSection.title')"
    ></SectionPrivacy>
  </div>
</template>

<script>
import Hero from './Hero.vue'
import Claim from './Claim.vue'
import SectionIdea from './SectionIdea.vue'
import SectionPrivacy from './SectionPrivacy.vue'
import SectionBenefits from './SectionBenefits.vue'
import FluxStream from '@/pages/Flux/StreamPage'
import DatetimePicker from '@/components/ui/DatetimePicker.vue'

export default {
  components: {
    Claim,
    DatetimePicker,
    FluxStream,
    Hero,
    SectionIdea,
    SectionPrivacy,
    SectionBenefits
  },
  data () {
    return {}
  },
  methods: {
    listDelays () {
      this.$store.dispatch('listAllTrips')
    }
  }
}
</script>

<style>
h1 {
  /* font-weight: 500; */
  font-family: Oswald;
  font-size: 1.5em !important;
  line-height: 1;
}
h2:before {
  color: #41c3de;
  content: "▶";
  margin-right: 10px;
}
h2 {
  font-family: Oswald;
  font-size: 1.25em !important;
}
#pitch p {
  margin-left: 24px;
  font-style: italic;
}
.section:nth-child(even) {
  flex-direction: row-reverse;
  background-color: #333;
}
.section {
  background-color: #444;
  color: #5ccbf0;
}
</style>
