import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Avatar, List, Switch, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components/Card';
import { GradientButton } from '../components/GradientButton';
import { spacing } from '../theme/spacing';

export const ProfileScreen = () => {
  const { user, signOut } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Profile Header */}
      <Card style={styles.headerCard}>
        <View style={styles.profileHeader}>
          <Avatar.Image
            size={80}
            source={{ uri: user?.photo_url || 'https://via.placeholder.com/80' }}
          />
          <View style={styles.profileInfo}>
            <Text variant="headlineSmall" style={styles.name}>
              {user?.name || 'User'}
            </Text>
            {user?.job_title && (
              <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.custom.textSecondary }]}>
                {user.job_title}
              </Text>
            )}
            {user?.department && (
              <Text variant="bodySmall" style={[styles.subtitle, { color: theme.custom.textSecondary }]}>
                {user.department}
              </Text>
            )}
          </View>
        </View>
      </Card>

      {/* User Details */}
      <Card style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Account Information
        </Text>
        <Divider style={styles.divider} />
        
        <List.Item
          title="User ID"
          description={user?.user_id || 'N/A'}
          left={(props) => <List.Icon {...props} icon="account" />}
        />
        
        {user?.email && (
          <List.Item
            title="Email"
            description={user.email}
            left={(props) => <List.Icon {...props} icon="email" />}
          />
        )}
        
        {user?.phone && (
          <List.Item
            title="Phone"
            description={user.phone}
            left={(props) => <List.Icon {...props} icon="phone" />}
          />
        )}
        
        {user?.role && (
          <List.Item
            title="Role"
            description={String(user.role).toUpperCase()}
            left={(props) => <List.Icon {...props} icon="shield-account" />}
          />
        )}
      </Card>

      {/* Settings */}
      <Card style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Settings
        </Text>
        <Divider style={styles.divider} />
        
        <List.Item
          title="Dark Mode"
          description={isDark ? 'Enabled' : 'Disabled'}
          left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
          right={() => (
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
            />
          )}
        />
      </Card>

      {/* Sign Out Button */}
      <GradientButton
        onPress={handleSignOut}
        style={styles.signOutButton}
      >
        Sign Out
      </GradientButton>

      <Text variant="bodySmall" style={[styles.version, { color: theme.custom.textSecondary }]}>
        Version 1.0.0
      </Text>
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
  headerCard: {
    marginBottom: spacing.md,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  name: {
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subtitle: {
    marginBottom: spacing.xs / 2,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  divider: {
    marginBottom: spacing.sm,
  },
  signOutButton: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  version: {
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
});
