import React from 'react';

const basePath = 'https://www.eurobitume.eu/';
const pathToImg = 'fileadmin/generic/pits_downloadcenter/Resources/Public/images/loading.gif';

const Preloader: React.FC = () => <img alt="preloader" src={`${basePath}${pathToImg}`} />;

export default Preloader;
