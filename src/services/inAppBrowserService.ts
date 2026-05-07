import { Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { lightTheme } from '~/design-system/app-theme/theme';

type BrowserType = 'basic' | 'auth';

type BaseOptions = {
  url: string;
  type?: BrowserType;
  toolbarColor?: string;
  enableUrlBarHiding?: boolean;
  enableDefaultShare?: boolean;
};

type AuthOptions = {
  redirectUrl: string;
};

export async function openBrowser(options: BaseOptions & Partial<AuthOptions>) {
  const {
    url,
    type = 'basic',
    redirectUrl,
    toolbarColor = lightTheme.colors.primary,
    enableUrlBarHiding = true,
    enableDefaultShare = false,
  } = options;

  try {
    const isAvailable = await InAppBrowser.isAvailable();

    if (!isAvailable) {
      Linking.openURL(url);
      return;
    }

    // BASIC FLOW
    if (type === 'basic') {
      return await InAppBrowser.open(url, {
        dismissButtonStyle: 'close',
        preferredBarTintColor: toolbarColor,
        showTitle: true,
        enableUrlBarHiding,
        enableDefaultShare,
        forceCloseOnRedirection: false,
      });
    }

    // AUTH FLOW
    if (type === 'auth') {
      if (!redirectUrl) {
        throw new Error('redirectUrl is required for auth flow');
      }

      return await InAppBrowser.openAuth(url, redirectUrl, {
        dismissButtonStyle: 'close',
        showTitle: true,
        enableUrlBarHiding,
        ephemeralWebSession: false,
      });
    }
  } catch (error) {
    console.warn('InAppBrowser failed, falling back', error);
    Linking.openURL(url);
  }
}
