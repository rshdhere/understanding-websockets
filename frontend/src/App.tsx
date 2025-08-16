import { useEffect, useRef, useState } from "react"

function App() {

  const [socket, setSocket] = useState();
  const inputRef = useRef<HTMLInputElement>();

  function sendMessage(){
    if(!socket){
      return;
    }

    const message = inputRef.current.value;
    
    //@ts-ignore
    socket.send(message);
  }

  useEffect(() => {
    const wss = new WebSocket("ws://localhost:8080");
    setSocket(wss)

    wss.onmessage = (e) => {
      alert(e.data);
    }
  }, []);

  return (
    <div>
      <input type="text" placeholder="message" ref={inputRef}/>
      <button onClick={sendMessage}>send</button>
    </div>
  )
}

export default App
