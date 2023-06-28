import { defineCustomElement } from 'vue'
import VueWidgetAgenda from './VueWidgetAgenda.ce.vue'

const WidgetCustomElement = defineCustomElement(VueWidgetAgenda)

customElements.define("vue-widget-agenda", WidgetCustomElement)
