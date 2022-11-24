import React from 'react';
import renderer from 'react-test-renderer';
import { Badge } from '.';

describe('Badge', () => {
  it("should return null if there's no children", () => {
    const alert = renderer.create(<Badge type="success">{null}</Badge>).toJSON();

    expect(alert).toEqual(null);
  });

  it('should render danger Badge', () => {
    const badge = renderer.create(<Badge type="danger">Danger</Badge>).toJSON();

    expect(badge).toMatchSnapshot();
  });

  it('should render warning Badge', () => {
    const badge = renderer.create(<Badge type="warn">Warning</Badge>).toJSON();

    expect(badge).toMatchSnapshot();
  });

  it('should render info Badge', () => {
    const badge = renderer.create(<Badge type="info">Info</Badge>).toJSON();

    expect(badge).toMatchSnapshot();
  });

  it('should render success Badge', () => {
    const badge = renderer.create(<Badge type="success">Success</Badge>).toJSON();

    expect(badge).toMatchSnapshot();
  });
});
