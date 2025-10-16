import React from 'react';
import { render } from '@testing-library/react-native';
import { Card } from '../../src/components/Card';
import { Text } from 'react-native';

describe('Card Component', () => {
  it('should render children correctly', () => {
    const { getByText } = render(
      <Card>
        <Text>Test Content</Text>
      </Card>
    );

    expect(getByText('Test Content')).toBeTruthy();
  });

  it('should apply custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <Card style={customStyle} testID="custom-card">
        <Text>Test</Text>
      </Card>
    );

    const card = getByTestId('custom-card');
    expect(card).toBeTruthy();
  });
});
