import React from 'react'

const PersonForm = (props) => {
  const nameVal = props.nameVal
  const nameHandler = props.nameHandler
  const numberVal = props.numberVal
  const numberHandler = props.numberHandler
  const btnHandler = props.btnHandler
  return(
      <form>
        <div>
          name: <input type="text" value={nameVal} onChange={nameHandler}/>
        </div>
        <div>
          number: <input type="number" value={numberVal} onChange={numberHandler}/>
        </div>
        <div>
          <button type="submit" onClick={btnHandler}>add</button>
        </div>
      </form>
  )
}

export default PersonForm