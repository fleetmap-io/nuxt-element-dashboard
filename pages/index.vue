<template>
  <div>
    <dashbord-component />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import DashbordComponent from '@/components/dashboard.vue'

export default {
  components: { DashbordComponent },
  computed: {
    ...mapGetters(['percentage'])
  }
}
</script>
