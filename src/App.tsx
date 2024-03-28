import './App.css'

function App() {

  return (
    <>
      <h1>You are Merlin</h1>
      <p>A text adventure game built with Rust and WASM.</p>
      <textarea className="input" cols={20} rows={16} readOnly/>
      <fieldset>
        <input className="input" type="text" /><button>Submit</button>
      </fieldset>
    </>
  )
}

export default App
