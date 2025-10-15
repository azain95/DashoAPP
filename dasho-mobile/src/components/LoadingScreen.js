import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';

export const LoadingScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
