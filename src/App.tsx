import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LoadingGrid } from './components/ui/LoadingGrid';

const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const Popular = lazy(() => import('./pages/Popular'));
const TopRated = lazy(() => import('./pages/TopRated'));
const Upcoming = lazy(() => import('./pages/Upcoming'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));

const PageLoader = () => (
  <div className="pt-6">
    <LoadingGrid count={12} />
  </div>
);

const App = () => (
  <Layout>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </Layout>
);

export default App;
