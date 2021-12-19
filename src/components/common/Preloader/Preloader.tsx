import React from 'react';

const Preloader: React.FC = () => {
  const basePath = 'https://www.eurobitume.eu/';
  const pathToImg = 'fileadmin/generic/pits_downloadcenter/Resources/Public/images/loading.gif';

  return <img alt="preloader" src={`${basePath}${pathToImg}`} />;
};

export default Preloader;
