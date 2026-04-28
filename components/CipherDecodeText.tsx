import React, { useState, useEffect } from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';
import * as Haptics from 'expo-haptics';

const CIPHER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>{}[];:';

interface CipherDecodeTextProps {
  text: string;
  style?: StyleProp<TextStyle>;
  speed?: number;
  startDelay?: number;
  repeatInterval?: number;
}

export default function CipherDecodeText({
  text,
  style,
  speed = 40,
  startDelay = 500,
  repeatInterval = 5000
}: CipherDecodeTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const initialHackedText = text
      .split('')
      .map(char => (char === ' ' ? ' ' : CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)]))
      .join('');
    setDisplayText(initialHackedText);

    let iteration = 0;
    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(() => {
          return text
            .split('')
            .map((char, index) => {
              if (index < iteration) return char;
              if (char === ' ') return ' ';
              return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
            })
            .join('');
        });

        Haptics.selectionAsync();
        iteration += 1 / 3;

        if (iteration >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

          if (repeatInterval > 0) {
            setTimeout(() => {
              setTrigger(prev => prev + 1);
            }, repeatInterval);
          }
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay, trigger]);

  return <Text style={style}>{displayText}</Text>;
}
