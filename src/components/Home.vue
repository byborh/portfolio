<script setup>
import HeroBlock from './home/HeroBlock.vue'
import AboutBlock from './home/AboutBlock.vue'
import WorkBlock from './home/WorkBlock.vue'
import PathBlock from './home/PathBlock.vue'
import CameraBlock from './home/CameraBlock.vue'
import TravelBlock from './home/TravelBlock.vue'
import StillsBlock from './home/StillsBlock.vue'
import OffHoursBlock from './home/OffHoursBlock.vue'
import ContactBlock from './home/ContactBlock.vue'
</script>

<!-- Tones alternate so no two neighbours share a colour:
     yellow · navy · blue · gold · red · navy · yellow · blue · yellow · (footer) navy -->
<template>
  <main>
    <HeroBlock />
    <AboutBlock />
    <WorkBlock />
    <PathBlock />
    <CameraBlock />
    <TravelBlock />
    <StillsBlock />
    <OffHoursBlock />
    <ContactBlock />
  </main>
</template>
