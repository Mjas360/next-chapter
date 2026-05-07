import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { screenNames } from '../utils/screenNames';

export const navigationRef: any = createNavigationContainerRef();

export function navigate(name: string, params?: object) {
  if (!navigationRef.isReady()) return;

  try {
    navigationRef.navigate(name as never, params as never);
  } catch (error) {
    console.warn('Navigation failed. Resetting navigation.', error);

    const isAuthenticated = false;
    //store.getState()?.authReducer?.isAuthenticated || false;

    if (isAuthenticated) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: screenNames.HOME }],
        }),
      );
    }

    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screenNames.LOGIN }],
      }),
    );
  }
}

export function replace(name: string, params?: object) {
  if (!navigationRef.isReady()) return;

  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name, params }],
    }),
  );
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function goBackOrReset(fallbackRoute: string, params?: object) {
  if (!navigationRef.isReady()) return;

  if (navigationRef.canGoBack()) {
    navigationRef.goBack();
  } else {
    replace(fallbackRoute, params);
  }
}
