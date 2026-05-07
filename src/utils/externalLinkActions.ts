import { openBrowser } from '~/services/inAppBrowserService';

export const openTerms = () =>
  openBrowser({
    type: 'basic',
    url: 'https://refineryprice.com/terms',
  });

export const openPrivacy = () =>
  openBrowser({
    type: 'basic',
    url: 'https://refineryprice.com/privacy',
  });

export const openHelpCenter = () =>
  openBrowser({
    type: 'basic',
    url: 'https://refineryprice.com',
  });
