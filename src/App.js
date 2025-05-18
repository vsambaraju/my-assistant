import { useState } from 'react';
import './App.css';
import Chat from './Components/Chat';
import ExpertSelector from './Components/ExpertSelector';

function App() {
  const [expert, setExpert] = useState('');

  function handleExpertChange(expert){
    setExpert(expert);
    console.log(expert);
  }
  
  return (
    <div className="App">
      <ExpertSelector onSelection={handleExpertChange}/>
      <Chat expert={expert}/>
    </div>
  );
}

export default App;
