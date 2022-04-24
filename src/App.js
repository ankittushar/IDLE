import { useState } from 'react';
import './App.css';
import Editor from "@monaco-editor/react";
import Navbar from './Navbar';
import Axios from 'axios';
import Question from './Question';

import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
 
  // State variable to set users source code
  const [userCode, setUserCode] = useState(``);
 
  // State variable to set editors default language
  const [userLang, setUserLang] = useState("python");
 
  // State variable to set editors default theme
  const [userTheme, setUserTheme] = useState("vs-dark");
 
  // State variable to set editors default font size
  const [fontSize, setFontSize] = useState(20);
 
  // State variable to set users input
  const [userInput, setUserInput] = useState("");
 
  // State variable to set users output
  const [userOutput, setUserOutput] = useState("");
 
  // Loading state variable to show spinner
  // while fetching data

  // const [loading, setLoading] = useState(false);
   
  const [compiling,setCompiling]= useState(0);
  const options = {
    fontSize: fontSize
  }

  function yoyo(intervals){
    for(let i=0; i<=intervals; i++){
      setTimeout(()=>{
        setCompiling((i*100)/intervals);
      },i*2);
    }
  }

  const something = {
    onUploadProgress: (progressEvent) =>{
      
      setCompiling(0);
      console.log(progressEvent);
      console.log(progressEvent.timeStamp);
      let totalTime=progressEvent.timeStamp;
      
      let intervals=Math.floor(totalTime/1000);
     
      yoyo(intervals,totalTime);
      

    }
  }
 
  // Function to call the compile endpoint
  function compile() {
    // setLoading(true);
    if (userCode === ``) {
      return
    }
 
    // Post request to compile endpoint
    Axios.post(`https://my-compile.herokuapp.com/compile`, {
      code: userCode,
      language: userLang,
      input: userInput },something).then((res) => {
      setUserOutput(res.data.output);
    }).then(() => {
      
      console.log("done ");
      
      // setLoading(false);
    })
  }
 
  // Function to clear the output screen
  function clearOutput() {
    setUserOutput("");
  }
 
  return (
    <div className="App">
     

      <Navbar
        userLang={userLang} setUserLang={setUserLang}
        userTheme={userTheme} setUserTheme={setUserTheme}
        fontSize={fontSize} setFontSize={setFontSize}
      />
      
      <div className="main">

        <Question/>
  
      
        <div className="left-container">
          <Editor
            options={options}
            height="calc(100vh - 50px)"
            width="100%"
            theme={userTheme}
            language={userLang}
            defaultLanguage="python"
            defaultValue="# Enter your code here"
            onChange={(value) => { setUserCode(value) }}
          />
          
          <button className="run-btn" onClick={() => compile()}>
             Run
          </button>
        </div>
        <div className="right-container">
          <h4>Input:</h4>
          
          <div className="input-box">
            <textarea id="code-inp" onChange=
              {(e) => setUserInput(e.target.value)}>
            </textarea>
          </div>

          <h4>Output:</h4>
          {compiling>0 && compiling<100 ? (
            
              

               <div className="output-box">
                
                <ProgressBar animated now={compiling} />
                
                {/* <img src={spinner} alt="Loading..." /> */}
              </div> 
        
          ) : (
            
            
            <div className="output-box">
              
              <pre>{userOutput}</pre>
              <button onClick={() => { clearOutput() }}
                 className="clear-btn">
                 Clear
              </button>
            </div>
            
          )}
        </div>
      </div>
    </div>
  );
}
 
export default App;
