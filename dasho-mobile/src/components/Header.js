import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing } from '../theme/spacing';

export const Header = ({ title, subtitle, action }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text variant="headlineMedium" style={styles.title}>
          {title}
        </Text>
        {subtitle && (
          <Text variant="bodyMedium" style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </View>
      {action && <View style={styles.action}>{action}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
  },
  subtitle: {
    marginTop: spacing.xs,
    opacity: 0.7,
  },
  action: {
    marginLeft: spacing.md,
  },
});
