import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../theme/spacing';
import { NotificationsTab } from './tabs/NotificationsTab';
import { AnnouncementsTab } from './tabs/AnnouncementsTab';

export const ActivityScreen = () => {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState('notifications');

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.segmentContainer}>
        <SegmentedButtons
          value={selectedTab}
          onValueChange={setSelectedTab}
          buttons={[
            {
              value: 'notifications',
              label: 'Notifications',
              icon: 'bell-outline',
            },
            {
              value: 'announcements',
              label: 'Announcements',
              icon: 'bullhorn-outline',
            },
          ]}
        />
      </View>

      {selectedTab === 'notifications' ? (
        <NotificationsTab />
      ) : (
        <AnnouncementsTab />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  segmentContainer: {
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
});
