import renderer from 'react-test-renderer';
import { Badge } from '.';

describe('Badge', () => {
  it('should render danger Badge', () => {
    const badge = renderer.create(<Badge type="danger">Danger</Badge>).toJSON();

    expect(badge).toMatchSnapshot();
  });

  it('should render warning Badge', () => {
    const badge = renderer.create(<Badge type="warning">Warning</Badge>).toJSON();

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
