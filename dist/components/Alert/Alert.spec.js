import { jsx as _jsx } from "react/jsx-runtime";
import renderer from 'react-test-renderer';
import { Alert } from '.';
describe('Alert', () => {
    it('should render danger alert', () => {
        const alert = renderer.create(_jsx(Alert, { type: "danger", children: "Danger" })).toJSON();
        expect(alert).toMatchSnapshot();
    });
    it('should render warning alert', () => {
        const alert = renderer.create(_jsx(Alert, { type: "warning", children: "Warning" })).toJSON();
        expect(alert).toMatchSnapshot();
    });
    it('should render info alert', () => {
        const alert = renderer.create(_jsx(Alert, { type: "info", children: "Info" })).toJSON();
        expect(alert).toMatchSnapshot();
    });
    it('should render success alert', () => {
        const alert = renderer.create(_jsx(Alert, { type: "success", children: "Success" })).toJSON();
        expect(alert).toMatchSnapshot();
    });
});
