import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { TextInput, Text, Snackbar } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { GradientButton } from '../components/GradientButton';
import { spacing, borderRadius } from '../theme/spacing';

export const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { signIn } = useAuth();
  const { theme } = useTheme();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    const result = await signIn(username.trim(), password);
    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <View style={[styles.logoCircle, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.logoText}>D</Text>
          </View>
          <Text variant="headlineLarge" style={[styles.brandName, { color: theme.colors.onBackground }]}>
            DASHO
          </Text>
          <Text variant="bodyLarge" style={[styles.tagline, { color: theme.custom.textSecondary }]}>
            Manage your work, effortlessly
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text variant="headlineMedium" style={[styles.welcomeText, { color: theme.colors.onBackground }]}>
            Welcome back
          </Text>
          <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.custom.textSecondary }]}>
            Sign in to continue
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              left={<TextInput.Icon icon="account" />}
            />

            <TextInput
              mode="outlined"
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              style={styles.input}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
          </View>

          <GradientButton
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          >
            Sign In
          </GradientButton>
        </View>
      </ScrollView>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        duration={4000}
        action={{
          label: 'Dismiss',
          onPress: () => setError(''),
        }}
      >
        {error}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  brandName: {
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  tagline: {
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  welcomeText: {
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subtitle: {
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  input: {
    marginBottom: spacing.md,
  },
  loginButton: {
    marginTop: spacing.md,
  },
});
