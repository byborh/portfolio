<script setup>
import HeroBlock from './home/HeroBlock.vue'
import ProfileBlock from './home/ProfileBlock.vue'
import WorkBlock from './home/WorkBlock.vue'
import PathBlock from './home/PathBlock.vue'
import BeyondTeaser from './home/BeyondTeaser.vue'
import ContactBlock from './home/ContactBlock.vue'
import { path } from '../data/site.js'
</script>

<!-- Professional only. The personal side lives on /about-me; the red band leads there.
     Tones alternate so no two neighbours share a colour:
     yellow · navy · blue · gold · red · yellow · (footer) navy -->
<template>
  <main>
    <HeroBlock />
    <ProfileBlock />
    <WorkBlock />
    <PathBlock id="path" kicker="Path" title="Work & study" tone="gold" :steps="path.pro" />
    <BeyondTeaser />
    <ContactBlock />
  </main>
</template>
