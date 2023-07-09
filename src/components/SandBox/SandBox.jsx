import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FolderTree from '../FolderTree/FolderTree';
import { testData } from '../../utils/testData';

/* eslint-disable */
const SandBox = ({ dndConfig }) => {
  const onTreeStateChange = (state, e) => console.log({ state, e });
  const [tree, setTree] = useState(null);

  return (
    !!testData && (
      <div className='demo-sandbox'>
        <FolderTree
          dndConfig={dndConfig}
          data={testData}
          onChange={onTreeStateChange}
          onIconClick={(e, nodeData) => {
            console.log('INSIDE ICON CLICK', e, nodeData);
            console.log(
              'event target postion',
              e.target.getBoundingClientRect()
            );
          }}
          readOnly
          showCheckbox={false}
          offsetToggleIcon={true}
          indentPixels={20}
          debug={true}
          searchData={{
            files: {
              YWm9BjSXt4PiCLMB: {
                matchCount: 3,
              },
            },
            folders: {
              Ga1zvj8qWOEfOVL2: 6,
            },
          }}
          showSearchData={true}
        />
      </div>
    )
  );
};

SandBox.propTypes = {
  dndConfig: PropTypes.shape({
    onDrop: PropTypes.func,
    onDragStart: PropTypes.func,
  }),
};

export default SandBox;
