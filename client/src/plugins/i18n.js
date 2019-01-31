import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE } from '@/constants/translation'
import en from '@/lang/en.json'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: DEFAULT_LANGUAGE,
  fallbackLocale: FALLBACK_LANGUAGE,
  messages: { en }
})
