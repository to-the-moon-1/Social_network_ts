import React from 'react';
import Preloader from '../components/common/Preloader/Preloader';

function withSuspense<WCP>(
  WrappedComponent: React.ComponentType<WCP>,
): (props: WCP) => JSX.Element {
  const render = (props: WCP): JSX.Element => (
    <React.Suspense fallback={<Preloader />}>
      <WrappedComponent {...props} />
    </React.Suspense>
  );
  return render;
}

export default withSuspense;
