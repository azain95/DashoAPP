import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { EmptyState } from '../../components/EmptyState';

export const AnnouncementsTab = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <EmptyState
        icon="bullhorn-outline"
        title="No Announcements"
        message="Company announcements will appear here"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
