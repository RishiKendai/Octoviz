
import './App.css'
import { useNavigate } from 'react-router-dom';
import Search from './components/common/Search';

function App() {
  const navigate = useNavigate();

  const handleSearch = (username: string) => {
    if (!username.trim()) {
      return
    }
    navigate(`/profile/${username}`);
  }
  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <h5 className="title"><span>Dev </span>portfolio</h5>
      <div className="w-full md:w-auto flex justify-center px-2">
        <Search onsearch={handleSearch} classes='w-full'/>
      </div>
    </div>
  )
}

export default App
