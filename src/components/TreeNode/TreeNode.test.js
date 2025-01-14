import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { mount } from 'enzyme';
import TreeNode from './TreeNode';

import { initializedTestData } from '../../utils/testData';
import ConfigContext from '../FolderTree/context';

let node;

const checkNode = jest.fn();
const renameNode = jest.fn();
const deleteNode = jest.fn();
const addNode = jest.fn();
const toggleOpen = jest.fn();
const onNameClick = jest.fn();
const dndConfig = {
  onDrop: null,
};

const render = ({
  iconComponents = {},
  indentPixels = 4,
  showCheckbox = true,
  readOnly = false,

  path,
  name,
  checked,
  isOpen,
  ...restData
}) => {
  const configs = {
    handleCheck: checkNode,
    handleRename: renameNode,
    handleDelete: deleteNode,
    handleAddNode: addNode,
    handleToggleOpen: toggleOpen,
    onNameClick,

    iconComponents,
    indentPixels,
    showCheckbox,
    readOnly,
  };

  node = mount((
    <ConfigContext.Provider
      value={ configs }
    >
      <DragDropContext
        onDragEnd={ dndConfig.onDrop }
      >
        <TreeNode
          path={ path }
          name={ name }
          checked={ checked }
          isOpen={ isOpen }
          { ...restData }
        />
      </DragDropContext>
    </ConfigContext.Provider>
  ));
};

test('render', () => {
  render({
    path: [],
    ...initializedTestData,
  });
});
