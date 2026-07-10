import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../app-theme/useAppTheme';

interface ScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  keyboardAware?: boolean;
  applyInsets?: boolean;
  styles?: StyleProp<ViewStyle>;
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';
}

export const ScreenContent = ({
  children,
  scroll = true,
  keyboardAware = true,
  applyInsets = true,
  styles,
  statusBarStyle = 'dark-content',
}: ScreenProps) => {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const content = (
    <View
      style={{
        flex: 1,
        paddingTop: applyInsets ? insets.top : 0,
        paddingBottom: applyInsets ? insets.bottom : 0,
        backgroundColor: colors.background,
        ...styles,
      }}
    >
      <StatusBar barStyle={statusBarStyle} translucent />
      {children}
    </View>
  );

  const maybeScroll = scroll ? (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>{content}</ScrollView>
  ) : (
    content
  );

  return keyboardAware ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {maybeScroll}
    </KeyboardAvoidingView>
  ) : (
    maybeScroll
  );
};
