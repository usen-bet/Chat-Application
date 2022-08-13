import { IoMdAddCircleOutline } from "react-icons/io" 
import "./Message.css"

const MessageForm = ({handleSubmit, text, setText, setImg}) => {
  return (
      <div className="hr">
          <hr/>
    <form className="message-form"  onSubmit={handleSubmit}>
          
          <label htmlFor='img'>
              <IoMdAddCircleOutline style={{
                  width: "25px", height: "25px", cursor: "pointer", color: "gray"
              }} />  
                  <input 
                      onChange={(e) => setImg(e.target.files[0])}
                      type="file"
                      id="img"
                      accept="image/*"
                      style={{ display: "none" }}
                  />
          </label>
              <div>
                  <input
                      type="text"
                      placeholder="Enter Message"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                  />
              </div>          
              <div>
                  <button className="btn">Send</button>
              </div>
    </form>          
      </div>
  )
}

export default MessageForm