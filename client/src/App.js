import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import CreateBlog from './components/createBlog/createBlog'
import BlogDetail from './pages/blogDetails/BlogDetail'
import UpdateBlog from './pages/updateBlog/UpdateBlog'
import FeaturedBlog from './components/featuredBlog/FeaturedBlog';
import { useSelector } from 'react-redux';
import NotFound from './pages/Not-Found/NotFound';

function App() {
  const { token } = useSelector((state) => state.auth)
  return (
    <>
      <Routes>
        <Route path='/' element={token ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={!token ? <Login /> : <Navigate to='/' />} />
        <Route path='/register' element={!token ? <Register /> : <Navigate to='/' />} />
        <Route path='/create' element={token ? <CreateBlog /> : <Navigate to='/login' />} />
        <Route path='/featured' element={token ? <FeaturedBlog /> : <Navigate to='/' />} />
        <Route path='/blog/:id' element={token ? <BlogDetail /> : <Navigate to='/login' />} />
        <Route path='/blog/update/:id' element={token ? <UpdateBlog /> : <Navigate to='/login' />} />
        <Route path='*' element={<NotFound />} />
      </Routes >
    </>
  );
}

export default App;
