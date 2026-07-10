import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';

export interface ButtonTab<T extends string = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

interface ButtonTabsProps<T extends string = string> {
  tabs: ButtonTab<T>[];
  activeTab: T;
  onChange: (tab: T) => void;
  scroll?: boolean;
  contentContainerStyle?: any;
  style?: any;
}

export function ButtonTabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  scroll = false,
  style,
  contentContainerStyle,
}: ButtonTabsProps<T>) {
  const { colors } = useAppTheme();

  const styles = useMemo(() => getStyles(colors), [colors]);

  const content = (
    <View
      style={[
        styles.container,
        !scroll && styles.fullWidth,
        contentContainerStyle,
      ]}
    >
      {tabs.map(tab => {
        const active = tab.value === activeTab;

        return (
          <Button
            key={tab.value}
            mode={active ? 'contained' : 'outlined'}
            compact
            disabled={tab.disabled}
            onPress={() => onChange(tab.value)}
            style={[styles.button, active && styles.activeButton]}
            labelStyle={[styles.label, active && styles.activeLabel]}
            // contentStyle={{ maxHeight: 44 }}
          >
            {tab.label}
          </Button>
        );
      })}
    </View>
  );

  if (!scroll) {
    return <View style={style}>{content}</View>;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style}
      contentContainerStyle={styles.scrollContent}
    >
      {content}
    </ScrollView>
  );
}

const getStyles = (colors: Record<string, any>) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 8,
    },
    fullWidth: {
      justifyContent: 'space-between',
    },
    scrollContent: {
      paddingHorizontal: 0,
    },
    button: {
      borderRadius: 16,
      minWidth: 60,
      paddingHorizontal: 12,
      alignSelf: 'center',
    },
    activeButton: {
      backgroundColor: colors.primary,
    },
    label: {
      color: colors.onSurface,
    },
    activeLabel: {
      color: colors.white,
    },
  });
