import type React from 'react';
import type { BackendFactory } from 'dnd-core';

type Checked = 0 | 0.5 | 1;

type CheckedStatus = 'checked' | 'custom' | 'unchecked';

type SearchDataProp = {
  folders: {
    [key: string]: number;
  };
  files: {
    [key: string]: {
      allMatchesArray: any[];
      matchCount: number;
      matches: any;
    };
  };
};

export interface FolderTreeProps {
  data: NodeData;
  iconComponents?: IconComponents;
  indentPixels?: number;
  offsetToggleIcon?: boolean;
  iconSize?: number;
  debug?: boolean;
  initCheckedStatus?: CheckedStatus;
  initOpenStatus?: OpenStatus;
  onChange?: OnChange;
  onNameClick?: OnNameClick;
  onIconClick?: (event: MouseEvent, nodeData: NodeData) => void;
  readOnly?: boolean;
  showCheckbox?: boolean;
  searchData: SearchDataProp;
  showSearchData?: boolean;
  dndConfig?: {
    backend: BackendFactory;
    onDrop: (dropTargetItem: {}, dragItem: {}) => void;
    onDragStart: (dragItem: {}) => void;
  };
}

export type Icon = React.FunctionComponent<IconProps>;

export interface IconComponents {
  CancelIcon?: Icon;
  CaretRightIcon?: Icon;
  CaretDownIcon?: Icon;
  DeleteIcon?: Icon;
  EditIcon?: Icon;
  FileIcon?: Icon;
  FolderIcon?: Icon;
  FolderOpenIcon?: Icon;
  OKIcon?: Icon;
}

export interface IconProps {
  nodeData: NodeData;
  onClick: () => void;
}

export interface NodeData {
  checked?: Checked;
  children?: Array<NodeData>;
  isOpen?: boolean;
  name: string;
  fileID?: string;
  folderID?: string;
  matchCount?: number;
  showSearchData?: boolean;
  [key: string]: any;
}

type OnChange = (state: NodeData, event: unknown) => void;

type OnNameClick = (opts: {
  defaultOnClick: () => void;
  nodeData: NodeData;
}) => void;

type OpenStatus = 'closed' | 'custom' | 'open';

declare const FolderTree: React.FunctionComponent<FolderTreeProps>;

export const testData: NodeData;

export default FolderTree;
