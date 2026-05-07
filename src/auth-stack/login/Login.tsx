import { zodResolver } from '@hookform/resolvers/zod';
import { t } from 'i18next';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { Avatar, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import Flex from '~/design-system/custom-components/Flex';
import { INSET_SAFE_MARGIN } from '~/design-system/tokens';
import { SectionHeader } from '~/utility/SectionHeader';
import { emitSnackbar } from '~/utility/snackbar/emitSnackbar';
import { formatPhoneNumber } from '~/utils/formatPhoneNumber';
import { getCountryDisplay } from '~/utils/getCountryDisplay';
import {
  Container,
  PaperButton,
  PaperTextInput,
  ScreenContent,
} from '../../design-system/custom-components';
import { navigate, replace } from '../../services/navigationService';
import { screenNames } from '../../utils/screenNames';
import { LoginSchemaType, loginSchema } from './helpers/loginSchema';
import { emitUIState } from '~/utility/ui-feedback/emitUIState';

const Login = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (
    data: LoginSchemaType,
  ) => {
    // emitUIState({
    //   type: 'loading',
    //   message: 'Please wait...',
    //   // dismissable: false,
    // });
    // emitSnackbar({
    //   type: 'error',
    //   message:
    //     "Invalid credentials. This is a demo, so you can't actually log in.",
    //   // actionLabel: 'OK',
    // });

    console.log('LOGIN PAYLOAD:', data);

    navigate(screenNames.VERIFY_PHONE_NUMBER, {
      source: 'login',
      number: data.phone,
    });
  };

  return (
    <ScreenContent
      applyInsets={false}
      styles={{ backgroundColor: colors.white }}
    >
      <Container gap={20} style={{ marginTop: 28, flex: 1 }}>
        <Avatar.Image
          size={58}
          source={require('@assets/logos/ios-app-icon.png')}
        />

        <SectionHeader
          title={t('Welcome back')}
          subtitle={t('Enter your phone number used for login.')}
        />
        <Flex gap={20} style={{ flex: 1 }}>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value }, fieldState }) => (
              <PaperTextInput
                label={t('Phone number')}
                value={formatPhoneNumber({
                  value,
                  countryCode: 'CM',
                })}
                onChangeText={v => onChange(String(v).replace(/[\s\-()]/g, ''))}
                errorMessage={fieldState.error?.message}
                keyboardType="phone-pad"
                left={
                  <TextInput.Affix
                    text={getCountryDisplay({
                      countryCode: 'CM',
                      dialCode: '+237',
                    })}
                  />
                }
              />
            )}
          />

          <PaperButton
            mode="contained"
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          >
            {t('Continue')}
          </PaperButton>
        </Flex>

        <Flex
          direction="row"
          justify="center"
          gap={4}
          style={{ marginBottom: insets.bottom + INSET_SAFE_MARGIN }}
        >
          <Text style={{ color: colors.gray3 }}>{t('New to MooniePay?')}</Text>

          <Text
            style={{ color: colors.primary, fontWeight: '500' }}
            onPress={() => replace(screenNames.SIGNUP)}
          >
            {t('Sign Up')}
          </Text>
        </Flex>
      </Container>
    </ScreenContent>
  );
};

export default Login;
