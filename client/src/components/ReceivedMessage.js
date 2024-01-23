import React from 'react'

const ReceivedMessage = ({ message }) => {
  return (
    <div className='py-1 px-2 my-1 rounded' style={{ background: "skyblue", color: "black", width: "48%", marginRight: "auto", overflow: "hidden", wordWrap: "break-word", whiteSpace: "normal" }}>
      {message.text}
    </div>
  )
}

export default ReceivedMessage