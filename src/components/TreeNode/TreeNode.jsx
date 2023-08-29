import React, {
  useContext,
  useEffect,
  useState,
  forwardRef,
} from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import {
  AiFillCaretRight,
  AiFillCaretDown,
  AiOutlineFolder,
  AiOutlineFolderOpen,
  AiOutlineFile,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFileAdd,
  AiOutlineFolderAdd,
  AiOutlineCheck,
} from 'react-icons/ai';

import CheckBox from '../CheckBox/CheckBox';
import ConfigContext from '../FolderTree/context';
import EditableName from '../EditableName/EditableName';
import {
  iconContainerClassName,
  iconClassName,
  getDefaultIcon,
} from '../../utils/iconUtils';

const TreeNodeChild = forwardRef(({
  path,
  name,
  checked,
  isOpen,
  children,
  fileID,
  folderID,
  provided,
  snapshot,
  skipChildren = true,
  ...restData
}, ref) => {
  const {
    handleCheck,
    handleRename,
    handleDelete,
    handleAddNode,
    handleToggleOpen,

    iconComponents,
    indentPixels,
    iconSize,
    offsetToggleIcon,
    onNameClick,
    onIconClick,
    showCheckbox,
    readOnly,

    searchData,
    showSearchData,
    activeParentFileId,
    childFilesData,

    debug,
  } = useContext(ConfigContext);

  const isFolder = !!children;

  let matchCount = 0;

  if (showSearchData && !!searchData) {
    matchCount = isFolder
      ? searchData.folders?.[folderID]
      : searchData.files?.[fileID]?.matchCount;
  }

  const nodeData = {
    path,
    name,
    checked,
    isOpen,
    fileID,
    folderID,
    matchCount,
    showSearchData,
    ...restData,
  };

  const level = path.length;

  const offsetSize = !isFolder ? 0 : iconSize;
  const offsetDiff = offsetToggleIcon ? offsetSize : 0;

  const treeNodeStyle = {
    marginLeft: level * indentPixels - offsetDiff,
  };
  
  if (debug) {
    console.log('----');
    console.log({
      name,
      level,
      isFolder,
      folderID,
      fileID,
      matchCount,
      marginLeft: treeNodeStyle.marginLeft,
    });
    console.log({
      indentPixels,
      iconSize,
      offsetDiff,
      offsetSize,
      offsetToggleIcon,
    });
  }

  if(debug && activeParentFileId) {
    console.log('activeParentFileId', activeParentFileId)
  }

  const [isSelected, setIsSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    FileIcon = getDefaultIcon(AiOutlineFile),
    FolderIcon = getDefaultIcon(AiOutlineFolder),
    FolderOpenIcon = getDefaultIcon(AiOutlineFolderOpen),
    EditIcon = getDefaultIcon(AiOutlineEdit),
    DeleteIcon = getDefaultIcon(AiOutlineDelete),
    CancelIcon = getDefaultIcon(AiOutlineClose),
    AddFileIcon = getDefaultIcon(AiOutlineFileAdd),
    AddFolderIcon = getDefaultIcon(AiOutlineFolderAdd),
    CaretRightIcon = getDefaultIcon(AiFillCaretRight),
    CaretDownIcon = getDefaultIcon(AiFillCaretDown),
    OKIcon = getDefaultIcon(AiOutlineCheck),
  } = iconComponents;

  let TypeIcon = FileIcon;
  let TypeIconType = 'FileIcon';
  if (isFolder) {
    TypeIcon = isOpen ? FolderOpenIcon : FolderIcon;

    TypeIconType = isOpen ? 'FolderOpenIcon' : 'FolderIcon';
  }

  const handleCheckBoxChange = (e) => {
    if (readOnly) return;

    const newStatus = +e.target.checked;
    handleCheck(path, newStatus);
  };

  const onNameChange = (newName) => handleRename(path, newName);

  const selectMe = () => !isEditing && !readOnly && setIsSelected(true);
  const unSelectMe = () => setIsSelected(false);

  const openMe = () => handleToggleOpen(path, true);
  const closeMe = () => handleToggleOpen(path, false);

  const editMe = () => {
    setIsEditing(true);
    setIsSelected(false);
  };

  const deleteMe = () => handleDelete(path);

  const addFile = () => handleAddNode(path, false);
  const addFolder = () => handleAddNode(path, true);

  const handleNameClick = () => {
    const defaultOnClick = selectMe;
    if (onNameClick && typeof onNameClick === 'function') {
      !isEditing && onNameClick({ defaultOnClick, nodeData });
    } else {
      defaultOnClick();
    }
  };

  const handleIconClick = (e) => {
    if (debug) {
      console.log('---');
      console.log('Clicked on icon');
      console.log('e', e);
      console.log('nodeData: ', nodeData);
      console.log('---');
    }
    onIconClick?.(e, nodeData);
  };

  const TreeNodeToolBar = (
    <span className={iconContainerClassName('TreeNodeToolBar')}>
      <EditIcon
        className={iconClassName('EditIcon')}
        onClick={editMe}
        nodeData={nodeData}
      />
      <DeleteIcon
        className={iconClassName('DeleteIcon')}
        onClick={deleteMe}
        nodeData={nodeData}
      />
      {isFolder && (
        <>
          <AddFileIcon
            className={iconClassName('AddFileIcon')}
            onClick={addFile}
            nodeData={nodeData}
          />
          <AddFolderIcon
            className={iconClassName('AddFolderIcon')}
            onClick={addFolder}
            nodeData={nodeData}
          />
        </>
      )}

      <CancelIcon
        className={iconClassName('CancelIcon')}
        onClick={unSelectMe}
        nodeData={nodeData}
      />
    </span>
  );

  const folderCaret = (
    <span className={iconContainerClassName('caretContainer')}>
      {isOpen ? (
        <CaretDownIcon
          className={iconClassName('CaretDownIcon')}
          onClick={closeMe}
          nodeData={nodeData}
        />
      ) : (
        <CaretRightIcon
          className={iconClassName('CaretRightIcon')}
          onClick={openMe}
          nodeData={nodeData}
        />
      )}
    </span>
  );

  // 'TreeNode__no-checkbox': !showCheckbox,
  // TreeNode__folder: isFolder,
  // TreeNode__file: !isFolder,
  // TreeNode__selected: isSelected,
  // TreeNode__editing: isEditing,
  // TreeNode__dragged: isDragging,
  // TreeNode__dragged-over: isOver,
  // TreeNode__open: isOpen,
  // TreeNode__root: level === 0,
  // TreeNode__top: level === 1,
  // [`TreeNode__level-${level}`]: true,

  const { isDragging, isDraggingOver: isOver } = snapshot;
  const { style, ...draggableProps } = provided.draggableProps || {};
  const dndProps = isFolder ? { ...provided.droppableProps } : { ...draggableProps, ...provided.dragHandleProps };
  const dragStyle = isDragging && !isFolder ? style : null;

  if(skipChildren && restData.childFile) {
    return <span ref={ref} {...dndProps }></span>
  }
  
  const isActiveFile = fileID === activeParentFileId;
  let childrenFiles = [];
  if(typeof childFilesData === 'object' && typeof childFilesData.filter === 'function') {
    childrenFiles = childFilesData.filter((file) => {
      return file.parentFileId === fileID
    })
  }

  return (
    <>
      <div
        ref={ ref }
        className={ `TreeNode ${
          isFolder ? 'TreeNode__folder' : 'TreeNode__file'
        } ${isSelected ? 'TreeNode__selected' : ''} ${
          isEditing ? 'TreeNode__editing' : ''
        } ${isDragging ? 'TreeNode__dragged' : ''} ${isOver ? 'TreeNode__dragged-over' : ''} ${isOpen ? 'TreeNode__open' : ''} ${
          level === 0 ? 'TreeNode__root' : ''
        } ${level === 1 ? 'TreeNode__top' : ''} TreeNode__level-${level}` }
        style={{ ...treeNodeStyle, ...dragStyle }}
        { ...dndProps }
      >
        {showCheckbox && (
          <CheckBox status={checked} onChange={handleCheckBoxChange} />
        )}

        {isFolder && folderCaret}

        <span
          className={iconContainerClassName('typeIconContainer')}
          onClick={handleIconClick}
        >
          <TypeIcon
            className={iconClassName(TypeIconType)}
            onClick={selectMe}
            nodeData={nodeData}
          />
        </span>

        <span
          className={iconContainerClassName('editableNameContainer')}
          onClick={handleNameClick}
        >
          <EditableName
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            onNameChange={onNameChange}
            OKIcon={OKIcon}
            CancelIcon={CancelIcon}
            nodeData={nodeData}
          />
        </span>
        {isSelected && TreeNodeToolBar}
        {/* Hide while also preventing dnd from complaining of missing provided.placeholder */}
        {isFolder && <div id="droppable-placeholder" style={{display: 'none'}}>{provided.placeholder}</div>}
      </div>

      { isActiveFile &&
        childrenFiles.map((data, idx) => {
          return (
            <TreeNode key={ data._id } path={ [...path, idx] } { ...data } skipChildren={false} />
          )
        })
      }

      { !isActiveFile && 
        childrenFiles.map((data, idx) => {
          return (
            <></>
          )
        })
      }

      {isFolder
        && isOpen
        && children.map((data, idx) => (
          <TreeNode key={ data._id } path={ [...path, idx] } { ...data } />
        ))}
    </>
  );
});

TreeNodeChild.propTypes = {
  path: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.number.isRequired,
  isOpen: PropTypes.bool,
  fileID: PropTypes.string,
  folderID: PropTypes.string,
  children: PropTypes.array,
  snapshot: PropTypes.object,
  provided: PropTypes.object,
};

let indexCounter = 0;

const TreeNode = props => {
  const { folderID, fileID } = props;
  const isFolder = !!props.children;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    indexCounter += 1;
    setIndex(indexCounter);
  }, []);

  if (index === 0) {
    return null;
  }

  return isFolder ? (
    <Droppable type='FolderNode' droppableId={ folderID }>
      {(provided, snapshot) => (
        <TreeNodeChild ref={ provided.innerRef } provided={ provided } snapshot={ snapshot } { ...props } />
      )}
    </Droppable>
  ) : (
    <Draggable
      draggableId={ fileID }
      index={ index }
    >
      {(provided, snapshot) => (
        <TreeNodeChild ref={ provided.innerRef } provided={ provided } snapshot={ snapshot } { ...props } />
      )}
    </Draggable>
  );
};

TreeNode.propTypes = {
  isOpen: PropTypes.bool,
  fileID: PropTypes.string,
  folderID: PropTypes.string,
  children: PropTypes.array,
};

export default TreeNode;
