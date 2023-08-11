import Content from './components/Content';
import Header from './components/Header';
import Nav from './components/Nav';
import './styles/app.scss'
import Movie from './components/Movie';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Movies from './components/Movies';
import Tv from './components/Tv';
import TvSeries from './components/TvSeries';
import PageNotFound from './components/PageNotFound';
import Admin from './components/admin/Admin';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={
          <>
            <Nav section='default' />
            <Content />
          </>
        }
        />
        <Route path='/movies' element={<Movies />} />
        <Route path='/tv' element={<Tv />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/tv/:id' element={<TvSeries />} />
        <Route path='/movies/:id' element={<Movie />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
