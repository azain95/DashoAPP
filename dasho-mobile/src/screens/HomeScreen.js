import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Pressable,
} from 'react-native';
import { Text, Avatar, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components/Card';
import { spacing, borderRadius } from '../theme/spacing';
import { getGreeting } from '../utils/helpers';
import api from '../utils/api';

export const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    pendingRequests: 0,
    todaysShifts: 0,
    onLeaveToday: 0,
  });

  const greeting = getGreeting();
  const firstName = user?.name?.split(' ')[0] || 'User';

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // TODO: Implement actual API call when backend is ready
      // const { data } = await api.get('/dashboard/statistics');
      // setStats(data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const quickActions = [
    {
      id: 'permission',
      title: 'New Permission',
      icon: 'clock-plus',
      color: theme.custom.primary,
      onPress: () => navigation.navigate('NewPermission'),
    },
    {
      id: 'leave',
      title: 'New Leave',
      icon: 'calendar-plus',
      color: theme.custom.secondary,
      onPress: () => navigation.navigate('NewLeave'),
    },
    {
      id: 'tasks',
      title: 'My Tasks',
      icon: 'checkbox-marked',
      color: theme.custom.success,
      onPress: () => navigation.navigate('Tasks'),
    },
    {
      id: 'profile',
      title: 'Profile',
      icon: 'account',
      color: theme.custom.info,
      onPress: () => navigation.navigate('Profile'),
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Welcome Card */}
      <Card style={[styles.welcomeCard, { backgroundColor: theme.colors.primary }]} elevation={2}>
        <View style={styles.welcomeContent}>
          <View style={styles.welcomeTextContainer}>
            <Text variant="headlineSmall" style={styles.greetingText}>
              {greeting}, {firstName} 👋
            </Text>
            <Text variant="bodyMedium" style={styles.welcomeSubtext}>
              Here's what's happening today
            </Text>
          </View>
          <Avatar.Image
            size={60}
            source={{ uri: user?.photo_url || 'https://via.placeholder.com/60' }}
          />
        </View>

        {/* User Info Chips */}
        <View style={styles.chipsContainer}>
          {user?.job_title && (
            <Chip icon="briefcase" style={styles.chip} textStyle={styles.chipText}>
              {user.job_title}
            </Chip>
          )}
          {user?.department && (
            <Chip icon="domain" style={styles.chip} textStyle={styles.chipText}>
              {user.department}
            </Chip>
          )}
          {user?.role && (
            <Chip icon="shield-account" style={styles.chip} textStyle={styles.chipText}>
              {String(user.role).toUpperCase()}
            </Chip>
          )}
        </View>
      </Card>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Text variant="labelSmall" style={[styles.statLabel, { color: theme.custom.textSecondary }]}>
            Pending Requests
          </Text>
          <Text variant="headlineMedium" style={[styles.statValue, { color: theme.colors.onSurface }]}>
            {stats.pendingRequests}
          </Text>
        </Card>

        <Card style={styles.statCard}>
          <Text variant="labelSmall" style={[styles.statLabel, { color: theme.custom.textSecondary }]}>
            Today's Shifts
          </Text>
          <Text variant="headlineMedium" style={[styles.statValue, { color: theme.colors.onSurface }]}>
            {stats.todaysShifts}
          </Text>
        </Card>

        <Card style={styles.statCard}>
          <Text variant="labelSmall" style={[styles.statLabel, { color: theme.custom.textSecondary }]}>
            On Leave Today
          </Text>
          <Text variant="headlineMedium" style={[styles.statValue, { color: theme.colors.onSurface }]}>
            {stats.onLeaveToday}
          </Text>
        </Card>
      </View>

      {/* Quick Actions */}
      <Text variant="titleLarge" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
        Quick Actions
      </Text>

      <View style={styles.actionsGrid}>
        {quickActions.map((action) => (
          <Pressable
            key={action.id}
            onPress={action.onPress}
            style={({ pressed }) => [
              styles.actionCard,
              pressed && styles.actionCardPressed,
            ]}
          >
            <Card style={styles.actionCardInner}>
              <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
                <Icon name={action.icon} size={28} color={action.color} />
              </View>
              <Text variant="bodyMedium" style={[styles.actionTitle, { color: theme.colors.onSurface }]}>
                {action.title}
              </Text>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  welcomeCard: {
    marginBottom: spacing.lg,
  },
  welcomeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  welcomeTextContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  greetingText: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  welcomeSubtext: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  chipText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    marginHorizontal: spacing.xs,
    alignItems: 'center',
  },
  statLabel: {
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  statValue: {
    fontWeight: '700',
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    marginBottom: spacing.md,
  },
  actionCardPressed: {
    opacity: 0.7,
  },
  actionCardInner: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  actionTitle: {
    textAlign: 'center',
    fontWeight: '600',
  },
});
