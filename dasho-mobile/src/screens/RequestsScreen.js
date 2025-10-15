import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../theme/spacing';
import { PermissionHistoryTab } from './tabs/PermissionHistoryTab';
import { LeaveHistoryTab } from './tabs/LeaveHistoryTab';

export const RequestsScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState('permissions');

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.segmentContainer}>
        <SegmentedButtons
          value={selectedTab}
          onValueChange={setSelectedTab}
          buttons={[
            {
              value: 'permissions',
              label: 'Permissions',
              icon: 'clock-outline',
            },
            {
              value: 'leaves',
              label: 'Leaves',
              icon: 'calendar-outline',
            },
          ]}
        />
      </View>

      {selectedTab === 'permissions' ? (
        <PermissionHistoryTab navigation={navigation} />
      ) : (
        <LeaveHistoryTab navigation={navigation} />
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
