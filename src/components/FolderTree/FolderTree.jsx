import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
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
  childFilesData = [],
  activeFileId = null,
  activeParentFileId = null,
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

    activeFileId,
    activeParentFileId,
    childFilesData,
    iconComponents,
    indentPixels,
    iconSize,
    offsetToggleIcon,
    showCheckbox,
    readOnly,
    debug,
    searchData,
    showSearchData,
  };

  /* ----------
    - custom configs are passed down in context, which is same for each tree node
    - tree node specific data is passed recursively to each node, which is different for each node
                                                                                        ---------- */

  if (debug) {
    console.log('tree state: ', treeState, activeParentFileId, childFilesData)
  }

  const { onDrop, onDragStart } = dndConfig || {};

  const handleDragEnd = result => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const dropTargetItem = {
      folderID: result.destination.droppableId,
    };
    const dragItem = {
      fileID: result.draggableId,
    };
    onDrop?.(dropTargetItem, dragItem);
  };

  const handleDragStart = result => {
    const dragItem = {
      fileID: result.draggableId,
    };
    onDragStart?.(dragItem);
  };

  return (
    <div className='FolderTree'>
      <ConfigContext.Provider value={ configs }>
        <DragDropContext
          onDragStart={ handleDragStart }
          onDragEnd={ handleDragEnd }
        >
          <TreeNode key={ treeState._id } path={ [] } { ...treeState } />
        </DragDropContext>
      </ConfigContext.Provider>
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

  activeFileId: PropTypes.string || PropTypes.bool, 
  activeParentFileId: PropTypes.string || PropTypes.bool, 
  childFilesData: PropTypes.array,
  searchData: PropTypes.object,
  showSearchData: PropTypes.bool,
  dndConfig: PropTypes.shape({
    onDrop: PropTypes.func,
    onDragStart: PropTypes.func,
  }),
};

export {
  testData,
  findTargetNode,
  findAllTargetPathByProp,
  findTargetPathByProp,
};
export default FolderTree;
