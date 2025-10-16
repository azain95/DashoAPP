/**
 * Navigation Smoke Test
 * Ensures the app navigation structure loads without errors
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import { AppNavigator } from '../../src/navigation/AppNavigator';
import { ThemeProvider } from '../../src/context/ThemeContext';
import { PaperProvider } from 'react-native-paper';

// Mock the screens to avoid complex dependencies
jest.mock('../../src/screens/HomeScreen', () => ({
  HomeScreen: () => null,
}));
jest.mock('../../src/screens/RequestsScreen', () => ({
  RequestsScreen: () => null,
}));
jest.mock('../../src/screens/TasksScreen', () => ({
  TasksScreen: () => null,
}));
jest.mock('../../src/screens/ActivityScreen', () => ({
  ActivityScreen: () => null,
}));
jest.mock('../../src/screens/ProfileScreen', () => ({
  ProfileScreen: () => null,
}));

describe('AppNavigator', () => {
  it('should render without crashing', () => {
    const { root } = render(
      <PaperProvider>
        <ThemeProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </PaperProvider>
    );

    expect(root).toBeTruthy();
  });
});
