import React from 'react';
import { render } from 'react-dom';
import SandBox from './components/SandBox/SandBox';

const root = document.getElementById('root');
render(
  <SandBox
    dndConfig={{
      onDragStart: dragItem => {
        console.log('onDragStart', dragItem);
      },
      onDrop: (dropTargetItem, dragItem) => {
        console.log('onDrop', dropTargetItem, dragItem);
      },
    }}
  />,
  root,
);
