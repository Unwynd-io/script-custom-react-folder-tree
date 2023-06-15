import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import useTreeState, {
  testData,
  findTargetNode,
  findAllTargetPathByProp,
  findTargetPathByProp,
} from 'use-tree-state';

import TreeNode from '../TreeNode/TreeNode';
import ConfigContext from './context';

import './FolderTree.scss';

const FolderTree = ({
  data,
  onChange = console.log, // eslint-disable-line
  initCheckedStatus = 'unchecked',
  initOpenStatus = 'open',
  iconComponents = {},
  showCheckbox = true,
  indentPixels = 30,
  iconSize = 20,
  offsetToggleIcon = false,
  onNameClick = null,
  onIconClick = null,
  readOnly = false,
  debug = false,
  searchData = null,
  showSearchData = false,
  dndConfig = {
    onDrop: null,
    onDragStart: null,
    backend: null,
  },
}) => {
  const options = {
    initCheckedStatus,
    initOpenStatus,
  };
  const { treeState, reducers } = useTreeState({ data, options, onChange });
  const { checkNode, renameNode, deleteNode, addNode, toggleOpen } = reducers;

  if (!treeState) return null;

  const configs = {
    handleCheck: checkNode,
    handleRename: renameNode,
    handleDelete: deleteNode,
    handleAddNode: addNode,
    handleToggleOpen: toggleOpen,
    onNameClick,
    onIconClick,

    iconComponents,
    indentPixels,
    iconSize,
    offsetToggleIcon,
    showCheckbox,
    readOnly,
    debug,
    searchData,
    showSearchData,
    dndConfig,
  };

  /* ----------
    - custom configs are passed down in context, which is same for each tree node
    - tree node specific data is passed recursively to each node, which is different for each node
                                                                                        ---------- */

  if (debug) {
    console.log('tree state: ', treeState);
  }

  return (
    <div className='FolderTree'>
      <DndProvider backend={ dndConfig.backend || HTML5Backend } options={ dndConfig.options }>
        <ConfigContext.Provider value={configs}>
          <TreeNode key={treeState._id} path={[]} {...treeState} />
        </ConfigContext.Provider>
      </DndProvider>
    </div>
  );
};

FolderTree.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func,

  initCheckedStatus: PropTypes.string,
  initOpenStatus: PropTypes.string,
  iconComponents: PropTypes.shape({
    FileIcon: PropTypes.func,
    FolderIcon: PropTypes.func,
    FolderOpenIcon: PropTypes.func,
    EditIcon: PropTypes.func,
    DeleteIcon: PropTypes.func,
    CancelIcon: PropTypes.func,
    AddFileIcon: PropTypes.func,
    AddFolderIcon: PropTypes.func,
    CaretRightIcon: PropTypes.func,
    CaretDownIcon: PropTypes.func,
  }),
  indentPixels: PropTypes.number,
  iconSize: PropTypes.number,
  offsetToggleIcon: PropTypes.bool,
  onNameClick: PropTypes.func,
  onIconClick: PropTypes.func,
  showCheckbox: PropTypes.bool,
  readOnly: PropTypes.bool,
  debug: PropTypes.bool,
  searchData: PropTypes.object,
  showSearchData: PropTypes.bool,
  dndConfig: PropTypes.shape({
    backend: PropTypes.func,
    onDrop: PropTypes.func,
  }),
};

export {
  testData,
  findTargetNode,
  findAllTargetPathByProp,
  findTargetPathByProp,
};
export default FolderTree;
