
import './App.css'



function App() {

  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <h5 className="title"><span>Dev </span>portfolio</h5>
      <div className="w-full flex justify-center">
        <div className="flex w-100">
          <input className="w-50 flex-1 mr-2" type="text" name="url" placeholder="GitHub username" />
          <button id="generateProfile"
            className="generate-btn bg-(--clr-accent) text-(--clr-primary) border-0 outline-0 px-3.5 py-2.5 text-[14px] leading-3 cursor-pointer font-semibold rounded-[5px] shadow-lg">Generate</button>
        </div>
      </div>
    </div>
  )
}

export default App
