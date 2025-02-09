import { Suspense, lazy } from 'react';

// import LazyComponent from './LazyComponent';
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    // <LazyComponent />

    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

export default App;