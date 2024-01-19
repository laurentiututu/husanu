<template>
  <div id="app">
    <MNotification/>
    <OHeader />
    <transition name="router-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <router-view class="min-height"/>
    </transition>
    <OFooter />
  </div>
</template>

<script>
import OHeader from '@/components/organisms/o-header.vue'
import OFooter from '@/components/organisms/o-footer.vue'
import MNotification from '@/components/molecules/m-notification.vue'

export default {
  name: 'Husanu',
  metaInfo: {
    title: 'Welcome',
    titleTemplate: '%s | HUSANU - Birou de Consultanta'
  },
  components: {
    OHeader,
    OFooter,
    MNotification
  }
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

body {
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.min-height {
  min-height: calc(100vh - 112px - 96px - 96px);
}
/*.page {
  position: fixed;
  width: inherit;
}*/
</style>
