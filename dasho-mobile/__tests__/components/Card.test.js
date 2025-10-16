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

  it('should render without errors', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByText } = render(
      <Card style={customStyle}>
        <Text>Custom Card</Text>
      </Card>
    );

    expect(getByText('Custom Card')).toBeTruthy();
  });
});
