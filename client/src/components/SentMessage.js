import React from 'react'

const SentMessage = ({message}) => {
    console.log("Hi")
  return (
    <div className='py-1 px-2 my-1 rounded' style={{ background: "gray", color: "black", width: "48%", marginLeft: "auto", overflow: "hidden", wordWrap: "break-word", whiteSpace: "normal" }}>{message.text}</div>
  )
}

export default SentMessage