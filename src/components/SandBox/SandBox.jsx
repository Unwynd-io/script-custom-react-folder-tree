import React, { useEffect, useState } from 'react';
import FolderTree, { testData } from '../FolderTree/FolderTree';

const makeId = (length) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

// 21 IDs, so that they are always the same - add if needed
const testIDS = [
  '1YX7vvp1oSsKbVmk',
  'KEdX5ukj6cyqHhri',
  'FCGk0rlxnozNwO7X',
  'C7hdysACGIBQR0CC',
  '3XPTvpd20DhLYg6j',
  '4WIhn55ynVOGiHix',
  'FwNTUcPZv0ET2adh',
  'BaJ5vmxUKPNuca7V',
  'wmAB3wqXmT7yx3Um',
  'lerFQtc7usZlV0QI',
  'GNLwtJCdXjFGo3R7',
  'xgwySK2ABj3oQUng',
  'Ga1zvj8qWOEfOVL2',
  'YWm9BjSXt4PiCLMB',
  '1Cxoe9DBs7oiEWps',
  'rFSWgJu0d9Lgoso1',
  'ufJsFqhGMYDmGHNO',
  'FdLmoTCujAjM9VME',
  'Q4SXolIgSodJJR9r',
  '3PetnwWjtbJErDuk',
  'SayEciikZbEGeiWy',
];

const parseTestData = (node) => {
  let count = 0;

  const parse = (node) => {
    if (!node) return null;

    count++;

    if (node.children) {
      node['folderID'] = testIDS[count];
      node.children.forEach((item) => {
        parse(item);
      });
    } else {
      node['fileID'] = testIDS[count];
    }

    return node;
  };

  return parse(node, count);
};

/* eslint-disable */
const SandBox = () => {
  const onTreeStateChange = (state, e) => console.log({ state, e });
  const [tree, setTree] = useState(null);

  console.log('test data', testData);

  useEffect(() => {
    const parsedData = parseTestData(testData, 1);
    setTree(parsedData);
    console.log('parsed data', parsedData);
  }, []);

  return (
    !!tree && (
      <div className='demo-sandbox'>
        <FolderTree
          data={tree}
          onChange={onTreeStateChange}
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

export default SandBox;
