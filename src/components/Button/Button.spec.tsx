import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from '.';

describe('Button', () => {
  it('should render danger Button', () => {
    const button = renderer.create(<Button type="danger">Danger</Button>).toJSON();

    expect(button).toMatchSnapshot();
  });

  it('should render warning Button', () => {
    const button = renderer.create(<Button type="warn">Warning</Button>).toJSON();

    expect(button).toMatchSnapshot();
  });

  it('should render info Button', () => {
    const button = renderer.create(<Button type="info">Info</Button>).toJSON();

    expect(button).toMatchSnapshot();
  });

  it('should render success Button', () => {
    const button = renderer.create(<Button type="success">Success</Button>).toJSON();

    expect(button).toMatchSnapshot();
  });
});
