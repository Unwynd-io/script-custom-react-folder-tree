const testData = {
  name: 'All Cryptos',
  children: [
    {
      name: 'Bitcoin',
      fileID: 'FCGk0rlxnozNwO7X',
    },
    {
      name: 'Etherium',
      fileID: 'C7hdysACGIBQR0CC',
    },
    {
      name: 'Polkadot',
      fileID: '3XPTvpd20DhLYg6j',
    },
    {
      name: 'POW',
      children: [
        {
          name: 'Bitcoin',
          fileID: 'FwNTUcPZv0ET2adh',
        },
        {
          name: 'Litecoin',
          fileID: 'BaJ5vmxUKPNuca7V',
        },
        {
          name: 'Bitcoin Cash',
          fileID: 'wmAB3wqXmT7yx3Um',
        },
      ],
      folderID: '4WIhn55ynVOGiHix',
    },
    {
      name: 'Public Chains',
      children: [
        {
          name: 'Ripple',
          fileID: 'GNLwtJCdXjFGo3R7',
        },
        {
          name: 'Chainlink',
          fileID: 'xgwySK2ABj3oQUng',
        },
        {
          name: 'POW',
          children: [
            {
              name: 'Bitcoin',
              fileID: 'YWm9BjSXt4PiCLMB',
            },
            {
              name: 'Litecoin',
              fileID: '1Cxoe9DBs7oiEWps',
            },
            {
              name: 'Bitcoin Cash',
              fileID: 'rFSWgJu0d9Lgoso1',
            },
          ],
          folderID: 'Ga1zvj8qWOEfOVL2',
        },
        {
          name: 'POS',
          children: [
            {
              name: 'Etherium',
              fileID: 'FdLmoTCujAjM9VME',
            },
            {
              name: 'EOS',
              fileID: 'Q4SXolIgSodJJR9r',
            },
            {
              name: 'Crosschain',
              children: [
                {
                  name: 'Polkadot',
                  fileID: 'SayEciikZbEGeiWy',
                },
                {
                  name: 'Cosmos',
                  fileID: '1YX7vvp1oSikZbEG',
                },
              ],
              folderID: '3PetnwWjtbJErDuk',
            },
          ],
          folderID: 'ufJsFqhGMYDmGHNO',
        },
      ],
      folderID: 'lerFQtc7usZlV0QI',
    },
  ],
  folderID: 'KEdX5ukj6cyqHhri',
};

const testDataWithId = {
  name: 'All Cryptos',
  _id: 0,
  children: [
    { name: 'Bitcoin', _id: 1 },
    { name: 'Etherium', _id: 2 },
    { name: 'Polkadot', _id: 3 },
    {
      name: 'POW',
      _id: 4,
      children: [
        { name: 'Bitcoin', _id: 5 },
        { name: 'Litecoin', _id: 6 },
        { name: 'Bitcoin Cash', _id: 7 },
      ],
    },
    {
      name: 'Public Chains',
      _id: 8,
      children: [
        { name: 'Ripple', _id: 9 },
        { name: 'Chainlink', _id: 10 },
        {
          name: 'POW',
          _id: 11,
          children: [
            { name: 'Bitcoin', _id: 12 },
            { name: 'Litecoin', _id: 13 },
            { name: 'Bitcoin Cash', _id: 14 },
          ],
        },
        {
          name: 'POS',
          _id: 15,
          children: [
            { name: 'Etherium', _id: 16 },
            { name: 'EOS', _id: 17 },
            {
              name: 'Crosschain',
              _id: 18,
              children: [
                { name: 'Polkadot', _id: 19 },
                { name: 'Cosmos', _id: 20 },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const initializedTestData = {
  name: 'All Cryptos',
  _id: 0,
  checked: 0,
  children: [
    { name: 'Bitcoin', _id: 1, checked: 0 },
    { name: 'Etherium', _id: 2, checked: 0 },
    { name: 'Polkadot', _id: 3, checked: 0 },
    {
      name: 'POW',
      _id: 4,
      checked: 0,
      children: [
        { name: 'Bitcoin', _id: 5, checked: 0 },
        { name: 'Litecoin', _id: 6, checked: 0 },
        { name: 'Bitcoin Cash', _id: 7, checked: 0 },
      ],
    },
    {
      name: 'Public Chains',
      _id: 8,
      checked: 0,
      children: [
        { name: 'Ripple', _id: 9, checked: 0 },
        { name: 'Chainlink', _id: 10, checked: 0 },
        {
          name: 'POW',
          _id: 11,
          checked: 0,
          children: [
            { name: 'Bitcoin', _id: 12, checked: 0 },
            { name: 'Litecoin', _id: 13, checked: 0 },
            { name: 'Bitcoin Cash', _id: 14, checked: 0 },
          ],
        },
        {
          name: 'POS',
          _id: 15,
          checked: 0,
          children: [
            { name: 'Etherium', _id: 16, checked: 0 },
            { name: 'EOS', _id: 17, checked: 0 },
            {
              name: 'Crosschain',
              _id: 18,
              checked: 0,
              children: [
                { name: 'Polkadot', _id: 19, checked: 0 },
                { name: 'Cosmos', _id: 20, checked: 0 },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export {
  testData,
  testDataWithId,
  initializedTestData,
};
