
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
        <Search onsearch={handleSearch} classes='w-full' />
      </div>
      <div className="w-full md:w-auto px-2 flex flex-col mt-3.5">
        <span className='flex justify-center px-2 w-full md:w-[561px] lg:w-[746px] text-center text-(--text-light-100)'>
          A developer profile analyzer that visualizes a GitHub user’s public data — including top repositories, languages, contribution activity, and more.
        </span>
        <a href="https://github.com/RishiKendai/dev-portfolio" target="_blank" rel="noopener noreferrer" className='text-[#4493f8] px-3 py-1.5 rounded-full mx-auto mt-3 text-sm font-semibold hover:underline underline-offset-4'>
          <svg className='inline mr-1' fill='currentColor' width="16" height="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><title>Git</title><g fillRule="nonzero"><path d="M15.6981994,7.28744895 L8.71251571,0.3018063 C8.3102891,-0.1006021 7.65784619,-0.1006021 7.25527133,0.3018063 L5.80464367,1.75263572 L7.64478689,3.59281398 C8.07243561,3.44828825 8.56276901,3.5452772 8.90352982,3.88604451 C9.24638012,4.22907547 9.34249661,4.72359725 9.19431703,5.15282127 L10.9679448,6.92630874 C11.3971607,6.77830046 11.8918472,6.8738964 12.2346975,7.21727561 C12.7135387,7.69595181 12.7135387,8.47203759 12.2346975,8.95106204 C11.755508,9.43026062 10.9796112,9.43026062 10.5002476,8.95106204 C10.140159,8.59061834 10.0510075,8.06127108 10.2336636,7.61759448 L8.57948492,5.9635584 L8.57948492,10.3160467 C8.69614805,10.3738569 8.80636859,10.4509954 8.90352982,10.5479843 C9.38237103,11.0268347 9.38237103,11.8027463 8.90352982,12.2822931 C8.42468862,12.7609693 7.64826937,12.7609693 7.16977641,12.2822931 C6.69093521,11.8027463 6.69093521,11.0268347 7.16977641,10.5479843 C7.28818078,10.4297518 7.42521643,10.3402504 7.57148065,10.2803505 L7.57148065,5.88746473 C7.42521643,5.82773904 7.28852903,5.73893407 7.16977641,5.62000506 C6.80707597,5.25747183 6.71983981,4.72499027 6.90597844,4.27957241 L5.09195384,2.465165 L0.301800552,7.25506126 C-0.100600184,7.65781791 -0.100600184,8.31027324 0.301800552,8.71268164 L7.28783254,15.6983243 C7.69005915,16.1005586 8.34232793,16.1005586 8.74507691,15.6983243 L15.6981994,8.74506934 C16.1006002,8.34266094 16.1006002,7.68968322 15.6981994,7.28744895"></path></g></svg>
          View repo
        </a>
      </div>

    </div>
  )
}

export default App
