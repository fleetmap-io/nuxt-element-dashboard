<i18n lang="yaml">
fr:
  Dashboard: 'Tableau de bord'
</i18n>
<template>
  <div style="height: 100%">
    <div style="position: absolute; right:10px; top:10px">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link" style="padding: 10px">
          <i class="el-icon-user" style="color:white" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>
            {{ userEmail }}
          </el-dropdown-item>
          <el-dropdown-item divided command="logout">
            Logout
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="headerDiv">
      <img :src="logo" alt="logo"><span style="padding: 5px">{{ $t('Dashboard') }}</span>
    </div>
    <Nuxt style="height: calc(100% - 40px)" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DefaultLayout',
  async fetch () {
    // await this.$store.dispatch('initData')
  },
  computed: {
    ...mapGetters(['user', 'title', 'email']),
    logo: () => `/img/logos/${window.location.hostname}.png`,
    userEmail () {
      const traccar = this.user && this.user.email
      return `${traccar} ${traccar !== this.email ? this.email : ''}`
    }
  },
  mounted () {
    switch (navigator.language) {
      case 'ca':
      case 'gl':
      case 'eu':
        this.$i18n.setLocale('es')
        break
      case 'fr':
      case 'pt':
      case 'es':
      case 'en':
        this.$i18n.setLocale(navigator.language)
        break
      default:
        if (navigator.language.toLowerCase().includes('fr')) {
          this.$i18n.setLocale('fr')
          return
        }
        if (navigator.language.toLowerCase().includes('en')) {
          this.$i18n.setLocale('en')
          return
        }
        if (navigator.language.toLowerCase().includes('es')) {
          this.$i18n.setLocale('es')
          return
        }
        if (navigator.language.toLowerCase().includes('pt')) {
          this.$i18n.setLocale('pt')
          return
        }
        this.$i18n.setLocale(navigator.language)
    }
  },
  methods: {
    handleCommand () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
<style>
@font-face {
  font-family: 'AmazonEmberLight';
  src: url('https://d7eumezdkbwin.cloudfront.net/fonts/AmazonEmber_Lt.woff2') format('woff2'), url('https://d2alv66jwtleln.cloudfront.net/fonts/AmazonEmber_Lt.woff') format('woff');
}

@font-face {
  font-family: 'AmazonEmber';
  src: url('https://d7eumezdkbwin.cloudfront.net/fonts/AmazonEmber_Rg.woff2') format('woff2'), url('https://d2alv66jwtleln.cloudfront.net/fonts/AmazonEmber_Rg.woff') format('woff');
}

@font-face {
  font-family: 'AmazonEmberBold';
  src: url('https://d7eumezdkbwin.cloudfront.net/fonts/AmazonEmber_Bd.woff2') format('woff2'), url('https://d2alv66jwtleln.cloudfront.net/fonts/AmazonEmber_Bd.woff') format('woff');
}

html, body{
  font-family: AmazonEmber, Helvetica Neue, Helvetica, Arial, sans-serif;
  margin: 0
}

.headerDiv {
  background-color: #177199;
  color: white;
  text-align: center;
  vertical-align: middle;
  font-size: larger;
  font-weight: bold;
  height: 40px;
  line-height:40px;
}

img {
  vertical-align: middle;
  max-height: 25px;
  max-width: 120px;
}

</style>
