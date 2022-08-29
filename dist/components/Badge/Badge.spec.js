import { jsx as _jsx } from "react/jsx-runtime";
import renderer from 'react-test-renderer';
import { Badge } from '.';
describe('Badge', () => {
    it('should render danger Badge', () => {
        const badge = renderer.create(_jsx(Badge, { type: "danger", children: "Danger" })).toJSON();
        expect(badge).toMatchSnapshot();
    });
    it('should render warning Badge', () => {
        const badge = renderer.create(_jsx(Badge, { type: "warning", children: "Warning" })).toJSON();
        expect(badge).toMatchSnapshot();
    });
    it('should render info Badge', () => {
        const badge = renderer.create(_jsx(Badge, { type: "info", children: "Info" })).toJSON();
        expect(badge).toMatchSnapshot();
    });
    it('should render success Badge', () => {
        const badge = renderer.create(_jsx(Badge, { type: "success", children: "Success" })).toJSON();
        expect(badge).toMatchSnapshot();
    });
});
