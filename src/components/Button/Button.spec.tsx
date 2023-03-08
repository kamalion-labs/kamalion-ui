import React from 'react';
import renderer from 'react-test-renderer';
//import { render, screen } from '@testing-library/react';
import { Button } from '.';
import { FaBeer } from 'react-icons/fa';

describe('Button', () => {
  it('should render primary Button', () => {
    const button = renderer.create(<Button type="primary">Primary</Button>).toJSON();

    expect(button).toMatchSnapshot();
  });

  it('should render secondary Button', () => {
    const button = renderer.create(<Button type="secondary">Secondary</Button>).toJSON();

    expect(button).toMatchSnapshot();
  });

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

  it('should render white Button', () => {
    const button = renderer.create(<Button type="white">White</Button>).toJSON();

    expect(button).toMatchSnapshot();
  });

  it('should render submit Button', () => {
    const button = renderer.create(<Button submit>Submit</Button>).toJSON();

    expect(button).toMatchSnapshot();
  });

  it('should have className', () => {
    const button = renderer.create(<Button className="bg-white">Classname</Button>).toJSON();

    expect(button).toMatchSnapshot();
  });

  it('should have icon only', () => {
    const button = renderer.create(<Button icon={<FaBeer />} />).toJSON();

    expect(button).toMatchSnapshot();
  });

  // it('should be clickable', () => {
  //   const mockCallBack = jest.fn();

  //   render(
  //     <Button type="primary" onClick={mockCallBack}>
  //       Button
  //     </Button>
  //   );
  //   // button.simulate('click');
  //   // expect(mockCallBack).toBeCalledTimes(1);
  //   //expect(button).toMatchSnapshot();
  // });

  // it('should have icon and be clickable', () => {
  //   const mockCallBack = jest.fn();

  //   render(
  //     <Button type="primary" icon={<FaBeer />} onClick={mockCallBack}>
  //       Button
  //     </Button>
  //   );

  //   const button = screen.getBy

  //   button.simulate('click');
  //   expect(mockCallBack).toBeCalledTimes(1);
  //   expect(button).toMatchSnapshot();
  // });

  // it('should have loader and be clickable', () => {
  //   const mockCallBack = jest.fn();

  //   const button = shallow(
  //     <Button type="primary" onClick={mockCallBack} usesLoader loadingText="Loading...">
  //       Button with loader
  //     </Button>
  //   );
  //   button.simulate('click');
  //   expect(mockCallBack).toBeCalledTimes(1);

  //   button.update();
  //   expect(button).toMatchSnapshot();
  // });

  // it('should have loader and icon and be clickable', () => {
  //   const mockCallBack = jest.fn();

  //   const button = shallow(
  //     <Button type="primary" onClick={mockCallBack} icon={<FaBeer />} usesLoader loadingText="Loading...">
  //       Button with loader
  //     </Button>
  //   );
  //   button.simulate('click');
  //   expect(mockCallBack).toBeCalledTimes(1);

  //   button.update();
  //   expect(button.find('.icon-spin')).toHaveLength(1);
  //   expect(button).toMatchSnapshot();
  // });

  // it('should have icon only and a loader and be clickable', () => {
  //   const mockCallBack = jest.fn();

  //   const button = shallow(<Button icon={<FaBeer />} usesLoader onClick={mockCallBack} />);
  //   button.simulate('click');
  //   expect(mockCallBack).toBeCalledTimes(1);

  //   button.update();
  //   expect(button.find('.icon-spin')).toHaveLength(1);
  //   expect(button).toMatchSnapshot();
  // });
});
