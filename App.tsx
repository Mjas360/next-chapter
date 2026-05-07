import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import { PaperProvider, Portal } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { queryClient } from '~/configs/queryClient';
import { initNetworkObserver } from '~/resolver/initNetworkObserver';
import { useAppInit } from '~/resolver/useAppInit';
import { useCheckAuthSession } from '~/sessions/useCheckAuthSession';
import AuthLoadingOverlay from '~/utility/AuthLoadingOverlay';
import { GlobalSnackbar } from '~/utility/snackbar/GlobalSnackbar';
import { UIFeedback } from '~/utility/ui-feedback/UIFeedback';
import {
  paperDarkTheme,
  paperLightTheme,
} from './src/design-system/app-theme/paperTheme';
import { RootNavigator } from './src/navigation/RootNavigator';

enableScreens();

function App() {
  const { i18n } = useTranslation();
  const scheme = useColorScheme();

  const theme = scheme === 'dark' ? paperDarkTheme : paperLightTheme;

  useAppInit();
  initNetworkObserver();
  useCheckAuthSession();

  return (
    <I18nextProvider i18n={i18n} key={i18n.language}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <Portal.Host>
              {/* AuthLoadingOverlay controlled by redux flag */}
              <AuthLoadingOverlay />
              <UIFeedback />
              <GlobalSnackbar />
              <RootNavigator />
            </Portal.Host>
          </SafeAreaProvider>
        </PaperProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;
