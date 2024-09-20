import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./components/Home'));
const Capture = lazy(() => import('./components/Capture'));
const Review = lazy(() => import('./components/Review'));
const Done = lazy(() => import('./components/Done'));
const CadastrarVeiculo = lazy(() => import('./components/CadastrarVeiculo'));
const FazerVistoria = lazy(() => import('./components/FazerVistoria'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/capture" element={<Capture />} />
          <Route path="/review" element={<Review />} />
          <Route path="/done" element={<Done />} />
          <Route path="/cadastrar-veiculo" element={<CadastrarVeiculo />} />
          <Route path="/vistoria" element={<FazerVistoria />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
