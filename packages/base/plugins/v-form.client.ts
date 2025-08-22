
// @ts-ignore
import VForm3 from 'v-form';
import 'v-form/dist/designer.style.css';
import { clientApi, adminApi } from 'api';
import dayjs from 'dayjs';
// @ts-ignore
export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp
  nuxtApp.vueApp.use(VForm3);
  if (window) {
    const pathname = window.location.pathname
    // @ts-ignore
    window.$api = pathname.includes('admin') ? adminApi?.instance : clientApi?.instance;
    // @ts-ignore
    window.$i18n = nuxtApp.$i18n;

    // @ts-ignore
    window.$formatDate = (date: string, format: 'YYYY-MM-DD') => {
      return dayjs(date).format(format);
    };
    // @ts-ignore
    window.$t = nuxtApp.$i18n.t;
    // @ts-ignore
    window.$getCookie = (name) => {
      const cookie = useCookie(name);
      return cookie.value || {};
    };
  }
})

