import { zodResolver } from '@hookform/resolvers/zod';
import { t } from 'i18next';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Trans } from 'react-i18next';
import { Avatar, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import Flex from '~/design-system/custom-components/Flex';
import { INSET_SAFE_MARGIN } from '~/design-system/tokens';
import { SectionHeader } from '~/utility/SectionHeader';
import { emitSnackbar } from '~/utility/snackbar/emitSnackbar';
import { openPrivacy, openTerms } from '~/utils/externalLinkActions';
import { formatPhoneNumber } from '~/utils/formatPhoneNumber';
import { getCountryDisplay } from '~/utils/getCountryDisplay';
import {
  Container,
  PaperButton,
  PaperTextInput,
  ScreenContent,
} from '../../design-system/custom-components';
import { replace } from '../../services/navigationService';
import { screenNames } from '../../utils/screenNames';
import AccountName from './components/AccountName';
import { LoginSchemaType, signupSchema } from './helpers/signupSchema';

const Signup = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (
    data: LoginSchemaType,
  ) => {
    emitSnackbar({
      type: 'info',
      message: 'Please wait while we finish checking your phone number…',
      // actionLabel: 'OK',
    });

    console.log('LOGIN PAYLOAD:', data);
  };

  const legalLinkStyle: any = { color: colors.primary, fontWeight: '500' };

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
          title={t('Create your account')}
          subtitle={t('Enter your phone number to get started.')}
        />
        <Flex gap={20} style={{ flex: 1 }}>
          <Flex gap={8}>
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
                  onChangeText={v =>
                    onChange(String(v).replace(/[\s\-()]/g, ''))
                  }
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

            <AccountName name={''} isLoading={false} />
          </Flex>

          <PaperButton
            mode="contained"
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          >
            {t('Continue')}
          </PaperButton>

          <Text style={{ lineHeight: 22 }}>
            <Trans
              i18nKey="By continuing, you agree to our <terms>Terms of Service</terms> and <privacy>Privacy Policy</privacy>."
              components={{
                terms: (
                  <Text
                    children={null}
                    onPress={openTerms}
                    style={legalLinkStyle}
                  />
                ),
                privacy: (
                  <Text
                    children={null}
                    onPress={openPrivacy}
                    style={legalLinkStyle}
                  />
                ),
              }}
            />
          </Text>
        </Flex>

        <Flex
          direction="row"
          justify="center"
          gap={4}
          style={{ marginBottom: insets.bottom + INSET_SAFE_MARGIN }}
        >
          <Text style={{ color: colors.not_black, textAlign: 'center' }}>
            {t('Already have an account?')}
          </Text>

          <Text
            style={{
              color: colors.primary,
              fontWeight: '500',
              textAlign: 'center',
            }}
            onPress={() => replace(screenNames.LOGIN)}
          >
            {t('Login')}
          </Text>
        </Flex>
      </Container>
    </ScreenContent>
  );
};

export default Signup;
