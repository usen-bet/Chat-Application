import Moment from "react-moment"
import "./Message.css"
import { useEffect, useRef } from "react"

const Message = ({ msg, user1 }) => {
 const scrollRef = useRef();
  useEffect(() => {
    
    scrollRef.current?.scrollIntoView({ behavior : "smooth" })
  },[msg])
  return (
      <div className={`message-wrapper ${msg.from === user1 ? "own" : ""}`}>
          <p className={`${msg.from === user1 ? "me" : "you"}`}>
              {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
              {msg.text}
              <br />
              <small className="small">
                  {msg.createdAt.toDate().toDateString()} 
              </small>
          </p>
    </div>
  )
}

export default Message