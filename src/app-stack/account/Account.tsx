import { t } from 'i18next';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import {
  Container,
  PaperButton,
  ScreenContent,
} from '~/design-system/custom-components';
import AccountListMenu from './components/AccountListMenu';
import { accountMenuList, otherMenuList } from './helpers/menuList';

const Account = () => {
  const { colors } = useAppTheme();
  return (
    <ScreenContent applyInsets={false}>
      <Container
        gap={24}
        style={{
          marginTop: 24,
          flex: 1,
          alignItems: 'center',
          marginBottom: 120,
        }}
      >
        <View style={[styles.header, { backgroundColor: colors.white }]}>
          <PaperButton mode="contained" style={{ flex: 1 }}>
            {t('Sign up / Sign in')}
          </PaperButton>
        </View>
        <AccountListMenu items={accountMenuList} />
        <AccountListMenu items={otherMenuList} />
      </Container>
    </ScreenContent>
  );
};

export default Account;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 20,
    width: '100%',
    borderRadius: 16,
  },
});
