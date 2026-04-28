import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CipherDecodeText from '@/components/CipherDecodeText';
import CryptoCards from '@/components/CryptoCards';

export default function App() {
  const player = useVideoPlayer(require('@/assets/bg_video.mp4'), (p) => {
    p.loop = true;
    p.play();
    p.muted = true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {player && (
        <VideoView
          player={player}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          nativeControls={false}
        />
      )}

      <View style={styles.overlay} />

      <View style={styles.content}>
        <View style={styles.header}>
          <CipherDecodeText
            text="MARKET.AI"
            style={styles.mainTitle}
            speed={30}
            startDelay={500}
          />
          <CipherDecodeText
            text="ANALYSIS FOR TRADERS"
            style={styles.subTitle}
            speed={25}
            startDelay={700}
          />
        </View>
        <CryptoCards />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  mainTitle: {
    color: '#CCFF00',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: 4,
    textAlign: 'center',
    textShadowColor: 'rgba(204, 255, 0, 0.4)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 20,
  },
  subTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 6,
    textAlign: 'center',
    opacity: 0.8,
  },
});