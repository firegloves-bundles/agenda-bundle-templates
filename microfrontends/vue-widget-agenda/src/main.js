import {defineCustomElement} from 'vue';
import VueWidgetAgenda from './VueWidgetAgenda.ce.vue';
import Keycloak from "keycloak-js";

const WidgetCustomElement = defineCustomElement(VueWidgetAgenda);

if (import.meta.env.PROD) {
    customElements.define("vue-widget-agenda", WidgetCustomElement);
} else {
    let initOptions = {
        url: import.meta.env.VITE_KEYCLOAK_URL,
        realm: import.meta.env.VITE_KEYCLOAK_REALM,
        clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
        onLoad: import.meta.env.PROD ? 'check-sso ' : 'login-required'
    }
    let keycloak = Keycloak(initOptions);
    keycloak.init({onLoad: initOptions.onLoad}).then((auth) => {
        if (!auth) {
            window.location.reload();
        } else {
            console.info("Authenticated");
            window.entando = {
                ...(window.entando || {}),
                keycloak
            };
            customElements.define("vue-widget-agenda", WidgetCustomElement);
        }
        setInterval(() => {
            keycloak.updateToken(70).then((refreshed) => {
                if (refreshed) {
                    console.debug('Token refreshed' + refreshed);
                } else {
                    console.warn('Token not refreshed, valid for '
                        + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
                }
            }).catch(() => {
                console.error('Failed to refresh token');
            });
        }, 60000)
    }).catch(() => {
        console.error("Authenticated Failed");
    });
}






