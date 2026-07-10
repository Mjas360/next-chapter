import React, { useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useAppTheme } from '../app-theme/useAppTheme';

type ListVariant = 'list' | 'swipeable';

interface ListRendererProps<T> {
  data: T[];
  variant?: ListVariant;
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  onIndexChange?: (index: number) => void;
}

const { width } = Dimensions.get('window');

export function ListRenderer<T>({
  data,
  variant = 'list',
  renderItem,
  keyExtractor,
  onIndexChange,
}: ListRendererProps<T>) {
  const scrollX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
    onIndexChange?.(index);
  };

  // =====================
  // VERTICAL LIST MODE
  // =====================
  if (variant === 'list') {
    return (
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={({ item, index }) => <View>{renderItem(item, index)}</View>}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  // =====================
  // SWIPEABLE MODE
  // =====================
  return (
    <View>
      <Animated.FlatList
        data={data}
        horizontal
        pagingEnabled
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        renderItem={({ item, index }) => (
          <View style={{ width: width * 0.8, alignItems: 'center' }}>
            {renderItem(item, index)}
          </View>
        )}
      />

      {data.length > 1 && (
        <PaginationDots total={data.length} activeIndex={activeIndex} />
      )}
    </View>
  );
}


interface Props {
  total: number;
  activeIndex: number;
}

function PaginationDots({ total, activeIndex }: Props) {
  const { colors } = useAppTheme();
  return (
    <View
      style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={{
            width: 26,
            height: 2,
            borderRadius: 4,
            marginHorizontal: 4,
            backgroundColor: i === activeIndex ? colors.primary : colors.gray,
          }}
        />
      ))}
    </View>
  );
}
