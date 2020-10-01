import i18n from 'i18n-js';

import en from './locales/en.json';
import ar from './locales/ar.json';

i18n.defaultLocale = 'ar';
i18n.locale = 'ar';
i18n.fallbacks = true;
i18n.translations = { en, ar };

export default i18n;