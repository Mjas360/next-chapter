import { openBrowser } from '~/services/inAppBrowserService';
import { navigate } from '~/services/navigationService';
import { screenNames } from './screenNames';

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

export const navigateToSearch = () =>
  navigate(screenNames.OTHER_STACK, {
    screen: screenNames.SEARCH,
  });
