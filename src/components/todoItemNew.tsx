import React, { useState } from 'react'
import Moment from 'moment'

import {NewTodoProps} from '../types/'

function NewTodoItem(props : NewTodoProps) {
    const [name, setName] = useState("")

    function handleSubmit() {
        props.onCreate(name)
    }

    function handleKeyPress(e : React.KeyboardEvent<HTMLInputElement>) {
        if(e.key === 'Enter'){
            handleSubmit()
        }
    }

    return (
    <div>
    <div className="todoContainer relative items-center flex py-3 px-2 my-3 w-full">
            <button className="cursor-pointer select-none text-3xl hover:opacity-75 pb-1 mr-5 hover:scale-110 transition-all 0.25s" onClick={() => props.cancelCreate()}>&times;</button>
            <input autoFocus className="todoInfo text-2xl grow focus:outline-none mr-5 w-6" value={name} type="text" onKeyPress={(e) => handleKeyPress(e)} onChange={(e) => setName(e.target.value)}/>
            <button type="button" className="bg-rose-600 text-white font-medium p-1 px-3 cursor-pointer hover:scale-110 transition-all 1s" onClick={() => handleSubmit()}>Add!</button>
        </div>
        <div className="mx-5 mb-5 italic text-base text-slate-500">{Moment(props.date).format('ddd, MMMM D YYYY')}</div>
        <hr className="textBreak"/>
    </div>
    )
}

export default NewTodoItem
