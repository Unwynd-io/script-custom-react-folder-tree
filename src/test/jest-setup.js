/* eslint-disable */
import React from 'react';
import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

// Mock implementation for react-beautiful-dnd

const DragDropContext = ({ children }) => <div>{children}</div>;
const Draggable = ({ children }) => children({ draggableProps: {}, dragHandleProps: {}, innerRef: () => {} }, { isDragging: false });
const Droppable = ({ children }) => children({ droppableProps: {}, placeholder: null }, { isDraggingOver: false });
jest.mock('react-beautiful-dnd', () => ({
  DragDropContext,
  Droppable,
  Draggable,
}));
