import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface GlassSubtitleProps {
  text: string;
  srcs: string[];
}

const GlassSubtitle = ({ text, srcs }: GlassSubtitleProps) => {
  return (
    <View style={styles.glass}>
      <Text variant="titleMedium" style={styles.text}>
        {text}
      </Text>

      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        {srcs.map((src, index) => (
          <View
            key={index}
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              backgroundColor: 'rgba(255,255,255,0.2)',
              marginRight: 8,
            }}
          >
            <Image
              source={{ uri: src }}
              style={{ width: 32, height: 32, borderRadius: 4 }}
              resizeMode="cover"
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default GlassSubtitle;

const styles = StyleSheet.create({
  glass: {
    // paddingVertical: 14,
    // paddingHorizontal: 14,
    // borderRadius: 14,
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-around',
    alignItems: 'flex-end',

    // key illusion layer
    // backgroundColor: 'rgba(255,255,255,0.08)',

    // edge definition (critical for glass feel)
    borderWidth: 0,
    borderColor: 'rgba(255,255,255,0.18)',

    // soft lift
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    elevation: 3,
  },

  text: {
    color: '#fff',
    fontWeight: '500',
    width: '80%',
    flexShrink: 1,
  },
});
