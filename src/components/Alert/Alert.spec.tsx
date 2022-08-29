import renderer from 'react-test-renderer';
import { Alert } from '.';

describe('Alert', () => {
  it('should render danger alert', () => {
    const alert = renderer.create(<Alert type="danger">Danger</Alert>).toJSON();

    expect(alert).toMatchSnapshot();
  });

  it('should render warning alert', () => {
    const alert = renderer.create(<Alert type="warning">Warning</Alert>).toJSON();

    expect(alert).toMatchSnapshot();
  });

  it('should render info alert', () => {
    const alert = renderer.create(<Alert type="info">Info</Alert>).toJSON();

    expect(alert).toMatchSnapshot();
  });

  it('should render success alert', () => {
    const alert = renderer.create(<Alert type="success">Success</Alert>).toJSON();

    expect(alert).toMatchSnapshot();
  });
});
