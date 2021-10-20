import './styles/quasar.sass'
import iconSet from 'quasar/icon-set/ionicons-v4.js'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import { Notify } from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
    config: {},
    plugins: {
        Notify
    },
    iconSet: iconSet
}