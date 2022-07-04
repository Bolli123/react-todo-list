import React from 'react'
import Moment from 'moment'
import { TodoItemProps } from '../types/index'

function TodoItem(props : TodoItemProps) {
  Moment.locale('en')

  function handleRemove(e : React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    props.removeItem(props.todoItem)
  }

  function handleChecked() {
    props.finishTask(props.todoItem)
  }

  function handleMove(up : boolean) {
    props.moveItem(up, props.todoItem)
  }
  // Package svgs better
  // https://www.svgrepo.com/svg/16833/up-arrow
  return (
    <div>
      <div className="todoContainer relative items-center flex py-3 px-2 my-3 w-full">
        <div className="w-5 mr-5">
          
          <svg 
            className="upArrow cursor-pointer hover:scale-110 transition-all 0.25s" 
            xmlns="http://www.w3.org/2000/svg" 
            x="0px" 
            y="0px" 
            viewBox="0 0 330.002 330.002" 
            onClick={() => handleMove(true)}>
              <path 
                id="XMLID_105_"
                d="M324.001,209.25L173.997,96.75c-5.334-4-12.667-4-18,0L6.001,209.25c-6.627,4.971-7.971,14.373-3,21
                c2.947,3.93,7.451,6.001,12.012,6.001c3.131,0,6.29-0.978,8.988-3.001L164.998,127.5l141.003,105.75c6.629,4.972,16.03,3.627,21-3
                C331.972,223.623,330.628,214.221,324.001,209.25z"
                />
            </svg >
            <svg 
              className="downArrow cursor-pointer hover:scale-110 hover:rotate-180 transition-all 0.25s" 
              xmlns="http://www.w3.org/2000/svg" 
              x="0px" 
              y="0px" 
              viewBox="0 0 330.002 330.002" 
              onClick={() => handleMove(false)}>
                <path 
                id="XMLID_105_" 
                d="M324.001,209.25L173.997,96.75c-5.334-4-12.667-4-18,0L6.001,209.25c-6.627,4.971-7.971,14.373-3,21
                  c2.947,3.93,7.451,6.001,12.012,6.001c3.131,0,6.29-0.978,8.988-3.001L164.998,127.5l141.003,105.75c6.629,4.972,16.03,3.627,21-3
                  C331.972,223.623,330.628,214.221,324.001,209.25z"
                />
            </svg>
          </div>
          <input 
            type="checkbox" 
            checked={props.todoItem.finished} 
            onChange={() => handleChecked()} 
            value="" 
            className="finishCheck cursor-pointer shrink-0 mr-5 w-6 h-6 border-0 rounded-md focus:ring-0"
          />
          <span 
            className={"todoInfo text-2xl truncate " + (props.todoItem.finished ? "strikeThrough" : "")}>
              {props.todoItem.name}
          </span>
          <div className="mx-10" />
          <button className="cursor-pointer select-none absolute right-5 top-2 text-3xl hover:opacity-75 hover:scale-110 transition-all 0.25s" onClick={(e) => handleRemove(e)}>&times;</button>
          <div className="mr-2">
        </div>
      </div>
      <div className="ml-12 mb-5 italic text-base text-slate-500">{Moment(props.todoItem.date).format('ddd, MMMM D YYYY')}</div>
      <hr className="textBreak"/>
    </div>
  )
}

export default TodoItem
