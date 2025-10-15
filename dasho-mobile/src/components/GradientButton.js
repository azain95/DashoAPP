import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { LinearGradient } from 'react-native-linear-gradient';
import { spacing, borderRadius } from '../theme/spacing';
import { useTheme } from '../context/ThemeContext';

export const GradientButton = ({
  children,
  onPress,
  loading = false,
  disabled = false,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const colors = theme.custom.gradient;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      {...props}
    >
      <View style={[styles.button, { backgroundColor: theme.colors.primary }]}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.text}>{children}</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderRadius: borderRadius.md,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
});
