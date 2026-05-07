import { zodResolver } from '@hookform/resolvers/zod';
import { useRoute } from '@react-navigation/native';
import { t } from 'i18next';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import {
  Container,
  PaperButton,
  PaperTextInput,
  ScreenContent,
} from '~/design-system/custom-components';
import Flex from '~/design-system/custom-components/Flex';
import { SectionHeader } from '~/utility/SectionHeader';
import { emitSnackbar } from '~/utility/snackbar/emitSnackbar';
import { emitUIState } from '~/utility/ui-feedback/emitUIState';
import { formatOtpDisplay } from '~/utils/formatOtpDisplay';
import {
  VerifyNumberSchemaType,
  verifyNumberSchema,
} from './helpers/verifyNumberSchema';

const VerifyNumber = () => {
  const { colors } = useAppTheme();
  const route = useRoute();
  const { source, number } = route.params as {
    source?: string; // 'login' | 'signup'
    number?: string;
  };

  const maskPhone = `•••••${(number || '').slice(-4)}`;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<VerifyNumberSchemaType>({
    resolver: zodResolver(verifyNumberSchema),
    mode: 'onChange',
    defaultValues: {
      code: '',
    },
  });

  const onSubmit: SubmitHandler<VerifyNumberSchemaType> = async (
    data: VerifyNumberSchemaType,
  ) => {
    emitUIState({
      type: 'success',
      message: 'Account created successfully',
        // dismissable: false,
    });

    console.log('LOGIN PAYLOAD:', data);
  };

  const handleResendCode = () => {
    emitSnackbar({
      type: 'success',
      message: 'Code re-send',
      actionLabel: 'OK',
    });
  };

  return (
    <ScreenContent
      applyInsets={false}
      styles={{ backgroundColor: colors.white }}
    >
      <Container gap={20} style={{ marginTop: 28, flex: 1 }}>
        <SectionHeader
          title={t('Verify your Phone Number')}
          subtitle={t(
            'Enter the 6-digit code sent to the phone number ending in {{number}}.',
            { number: maskPhone },
          )}
        />
        <Flex gap={20}>
          <Controller
            control={control}
            name="code"
            render={({ field: { onChange, value }, fieldState }) => (
              <PaperTextInput
                label={t('Enter code')}
                value={formatOtpDisplay(value || '')}
                onChangeText={v => onChange(String(v).replace(/[\s\-()]/g, ''))}
                errorMessage={fieldState.error?.message}
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

          <Text style={{ lineHeight: 22 }}>
            {t('Didn’t receive the code?')}{' '}
            <Text
              onPress={handleResendCode}
              style={{
                color: colors.primary,
                fontWeight: '500',
              }}
            >
              {t('Resend')}
            </Text>
          </Text>
        </Flex>
      </Container>
    </ScreenContent>
  );
};

export default VerifyNumber;
