import { Button } from '../components/Button';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Button', () => {
  it('renders a Button', () => {
    const { getByRole } = render(<Button>Test button</Button>);
    expect(
      getByRole('button', {
        name: /test button/i,
      }),
    ).toBeInTheDocument();
  });
});
