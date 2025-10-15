import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { spacing } from '../theme/spacing';
import { useTheme } from '../context/ThemeContext';

export const EmptyState = ({ icon, title, message }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Icon name={icon} size={64} color={theme.colors.outline} />
      <Text variant="titleLarge" style={[styles.title, { color: theme.colors.onSurface }]}>
        {title}
      </Text>
      <Text variant="bodyMedium" style={[styles.message, { color: theme.custom.textSecondary }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  title: {
    marginTop: spacing.lg,
    fontWeight: '600',
    textAlign: 'center',
  },
  message: {
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
