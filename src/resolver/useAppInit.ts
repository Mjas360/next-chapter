import { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { Config } from 'react-native-config';
import { initLanguage } from '~/i18n/initLanguage';
import { Platform } from 'react-native';

export function useAppInit() {
  useEffect(() => {
    const bootstrap = async () => {
      console.log(`${Platform.OS}_APP_NAME: `, Config.APP_NAME);
      await initLanguage();
      
      // display splash for 0.5s before closing
      await new Promise((resolve: any) => setTimeout(resolve, 500));
      await RNBootSplash.hide({ fade: true });
    };

    bootstrap();
  }, []);
}
