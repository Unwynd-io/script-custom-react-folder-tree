import React from 'react';
import FolderTree, { testData } from '../FolderTree/FolderTree';

/* eslint-disable */
const SandBox = () => {
  const onTreeStateChange = (state, e ) => console.log({ state, e });

  return (
    <div className='demo-sandbox'>
      <FolderTree
        data={testData}
        onChange={onTreeStateChange}
        readOnly
        showCheckbox={false}
        // offsetToggleIcon={true}
        // indentPixels={20}
      />
    </div>
  );
};

export default SandBox;
