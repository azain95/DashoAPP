import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { Text, Chip, Button, FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { spacing } from '../../theme/spacing';
import { formatDate, formatTime, getStatusColor } from '../../utils/helpers';
import api from '../../utils/api';

export const PermissionHistoryTab = ({ navigation }) => {
  const { theme } = useTheme();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/requests?type=permission');
      setRequests(data || []);
    } catch (error) {
      console.error('Error loading permissions:', error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRequests();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => {
    const statusColor = getStatusColor(item.status, theme.custom);

    return (
      <Card style={styles.requestCard}>
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <Icon name="clock-outline" size={24} color={theme.colors.primary} />
            <View style={styles.headerText}>
              <Text variant="titleMedium" style={styles.requestType}>
                {item.req_type === 'permission' ? 'Permission' : 'Swap'}
              </Text>
              <Text variant="bodySmall" style={[styles.dateText, { color: theme.custom.textSecondary }]}>
                {formatDate(item.req_datetime, 'MMM dd, yyyy')}
              </Text>
            </View>
          </View>
          <Chip
            style={[styles.statusChip, { backgroundColor: `${statusColor}20` }]}
            textStyle={[styles.statusText, { color: statusColor }]}
          >
            {item.status}
          </Chip>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.dateTimeRow}>
            <Icon name="calendar" size={16} color={theme.custom.textSecondary} />
            <Text variant="bodySmall" style={[styles.detailText, { color: theme.custom.textSecondary }]}>
              {formatDate(item.date_from)} - {formatDate(item.date_to)}
            </Text>
          </View>
          
          <View style={styles.dateTimeRow}>
            <Icon name="clock" size={16} color={theme.custom.textSecondary} />
            <Text variant="bodySmall" style={[styles.detailText, { color: theme.custom.textSecondary }]}>
              {item.time_from} - {item.time_to}
            </Text>
          </View>

          {item.reason && (
            <View style={styles.reasonContainer}>
              <Text variant="bodySmall" style={[styles.reasonLabel, { color: theme.custom.textSecondary }]}>
                Reason:
              </Text>
              <Text variant="bodyMedium" style={styles.reasonText}>
                {item.reason}
              </Text>
            </View>
          )}
        </View>
      </Card>
    );
  };

  if (loading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
        <EmptyState icon="clock-outline" title="Loading..." message="" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item, index) => `permission-${item.id || index}`}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            icon="clock-outline"
            title="No Permissions"
            message="Your permission requests will appear here"
          />
        }
      />

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('NewPermission')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: spacing.md,
  },
  requestCard: {
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerText: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  requestType: {
    fontWeight: '600',
  },
  dateText: {
    marginTop: spacing.xs / 2,
  },
  statusChip: {
    height: 28,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  cardBody: {
    paddingTop: spacing.sm,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  detailText: {
    marginLeft: spacing.xs,
  },
  reasonContainer: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  reasonLabel: {
    fontWeight: '600',
    marginBottom: spacing.xs / 2,
  },
  reasonText: {
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    margin: spacing.md,
    right: 0,
    bottom: 0,
  },
});
