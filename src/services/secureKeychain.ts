import * as Keychain from 'react-native-keychain';

const BASE_SERVICE = 'nextchapter.auth';

export type AuthKeys = 'access_token' | 'refresh_token';

type SecureOptions = {
  requireBiometric?: boolean;
};

export const setSecureKey = async (
  key: AuthKeys,
  value: string,
  options?: SecureOptions,
) => {
  try {
    const service = `${BASE_SERVICE}.${key}`;

    const config = {
      service,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
      ...(options?.requireBiometric
        ? {
            accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
          }
        : {}),
    };

    await Keychain.setGenericPassword(key, value, config);

    return true;
  } catch (error) {
    console.error('[Keychain] setSecureKey error:', error);
    return false;
  }
};

export const getSecureKey = async (key: AuthKeys): Promise<string | null> => {
  try {
    const result = await Keychain.getGenericPassword({
      service: `${BASE_SERVICE}.${key}`,
    });

    if (!result) return null;

    return result.password;
  } catch (error) {
    console.error('[Keychain] getSecureKey error:', error);
    return null;
  }
};

export const removeSecureKey = async (key: AuthKeys) => {
  try {
    await Keychain.resetGenericPassword({
      service: `${BASE_SERVICE}.${key}`,
    });
    return true;
  } catch (error) {
    console.error('[Keychain] removeSecureKey error:', error);
    return false;
  }
};
