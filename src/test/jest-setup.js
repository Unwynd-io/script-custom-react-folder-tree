import React from 'react';
import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

// Mock implementation for the DndProvider component
const DndProvider = ({ children }) => <div>{children}</div>;

jest.mock('react-dnd', () => ({
  useDrag: jest.fn((...args) => [{ isDragging: false }, jest.fn()]),
  useDrop: jest.fn((...args) => [{ isOver: false }, jest.fn()]),
  DndProvider,
}));

jest.mock('react-dnd-html5-backend', () => ({
  HTML5Backend: jest.fn(),
}));
