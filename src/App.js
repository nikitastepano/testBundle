import { Suspense, lazy } from 'react';

// import LazyComponent from './LazyComponent';
// import LazySurf from './LazySurf';
const LazyComponent = lazy(() => import('./LazyComponent'));
const LazySurf = lazy(() => import('./LazySurf'))

function App() {
  return (
    <>
    {/* <LazyComponent /> */}
    {/* <LazySurf /> */}

    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>

    <Suspense fallback={<div>Loading...</div>}>
      <LazySurf />
    </Suspense>
    </>
  );
}

export default App;