import React from 'react';
import Preloader from '../components/common/Preloader/Preloader';

type UnknownObj = Record<string, any>;

const withSuspense = <WCP extends UnknownObj>(
  WrappedComponent: React.ComponentType<WCP>,
): ((props: WCP) => JSX.Element) => {
  return (props: WCP): JSX.Element => (
    <React.Suspense fallback={<Preloader />}>
      <WrappedComponent {...props} />
    </React.Suspense>
  );
};

export default withSuspense;
