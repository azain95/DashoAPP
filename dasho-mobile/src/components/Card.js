import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Surface } from 'react-native-paper';
import { spacing, borderRadius, elevation } from '../theme/spacing';

export const Card = ({ children, style, onPress, elevation: elev = 1 }) => {
  const Component = onPress ? Pressable : View;

  return (
    <Component onPress={onPress} style={({ pressed }) => [
      pressed && onPress && styles.pressed,
    ]}>
      <Surface style={[styles.card, elevation[elev === 1 ? 'small' : elev === 2 ? 'medium' : 'large'], style]} elevation={elev}>
        {children}
      </Surface>
    </Component>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  pressed: {
    opacity: 0.7,
  },
});
