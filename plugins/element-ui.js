import Vue from 'vue'
import Element from 'element-ui'
import pt from 'element-ui/lib/locale/lang/pt'
import fr from 'element-ui/lib/locale/lang/fr'
import es from 'element-ui/lib/locale/lang/es'

export default (context) => {
  switch (context.app.i18n.locale) {
    case 'fr':
      Vue.use(Element, { locale: fr })
      break
    case 'es':
      Vue.use(Element, { locale: es })
      break
    default:
      Vue.use(Element, { locale: pt })
  }
}
