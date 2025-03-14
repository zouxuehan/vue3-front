import {createI18n} from 'vue-i18n';

async function getLocales(modules) {
  const messages = {}
  for (const [key, val] of Object.entries(modules)) {
    const name = key.split('/').pop().split('.')[0]
    messages[name] = val.default
  }
  return messages
}

export const i18n = createI18n({
    legacy: false,
    locale: 'zh-CN',
    messages: {
      'zh-CN': await getLocales(import.meta.glob('./lang/zh-CN/*.js', { eager: true })),
      'en': await getLocales(import.meta.glob('./lang/en/*.js', { eager: true }))
    }
  });
