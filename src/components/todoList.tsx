import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import TodoItem from './todoItem'
import { TodoItemType } from '../types'

import 'react-calendar/dist/Calendar.css'
import NewTodoItem from './todoItemNew'

function TodoList() {
    const [todoItems, setTodoItems] = useState<Array<TodoItemType>>(JSON.parse(localStorage.getItem('todoList') || "{}"))
    const [calendarDate, setCalendarDate] = useState<Date>(new Date())
    const [calendarVisible, setCalendarVisible] = useState<boolean>(false)
    const [newItem, setNewItem] = useState<boolean>(false)

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoItems))
    }, [todoItems])

    function CalendarSubmit(date : Date) {
        setCalendarDate(date)
        setCalendarVisible(false)
        setNewItem(true)
    }

    function handleAddClick(e :React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        setCalendarVisible(!calendarVisible)
    }

    function addNewTask(taskName : string) {    
        setNewItem(false)
        let item = {
            date: calendarDate,
            name: taskName,
            createdOn: new Date(),
            finished: false,
        }
        if(todoItems.length > 0) {
            setTodoItems(todoItems => [...todoItems, item]);
        }
        else {
            setTodoItems([item])
        }
    }

    function removeItem(item : TodoItemType) {
        let items = [...todoItems]
        const index = items.indexOf(item)
        if (index > -1) {
            items.splice(index, 1)
        }
        setTodoItems(items)
    }

    function finishTask(item : TodoItemType) {
        let items = [...todoItems]
        const index = items.indexOf(item)
        if (index > -1) {
            items[index].finished = !items[index].finished 
        }
        setTodoItems(items)
    }

    function cancelCreate() {
        setNewItem(false)
    }

    function moveItem(up : boolean, item : TodoItemType) {
        let items = [...todoItems]
        const index = items.indexOf(item)
        //Swaps the item with the one below or above
        if (index > -1) {
            var toSwap = up ? index-1 : index+1
            //Out of bounds check
            if (toSwap < 0 || toSwap >= items.length) return
            var temp = items[index]
            items[index] = items[toSwap]
            items[toSwap] = temp
        }
        setTodoItems(items)
    }

    return (
    <div>
        <div className="todoContainer">
            <h1 className={"todoName inline text-3xl font-bold text-rose-600"}>
                Todo List!
            </h1>
            <div className="items w-full">

                {Object.keys(todoItems).map((key, i) => (
                    <TodoItem 
                        moveItem={moveItem}
                        key={i+1} 
                        todoItem={todoItems[i]} 
                        finishTask={finishTask} 
                        removeItem={removeItem}></TodoItem>
                ))}
            </div>
            {(newItem ?
                <NewTodoItem cancelCreate={cancelCreate} date={calendarDate} onCreate={addNewTask}/>
                :
                null)
            }
            <button 
                className="todoNew cursor-pointer select-none text-rose-600 text-5xl hover:scale-110 transition-all 0.25s" 
                onClick={(e) => handleAddClick(e)}>
                    +
            </button>
            <div className="relative">
                <Calendar 
                    className={`Calendar drop-shadow-md rounded-lg absolute left-10 -top-20 w-max ` + (calendarVisible ? "inline" : "hidden")} 
                    onClickDay={(value, e) => CalendarSubmit(value)}
                    maxDetail={"month"} 
                    minDate={new Date()} 
                    onChange={setCalendarDate} 
                    value={calendarDate}
                />
                <div className="todoNew font-bold cursor-pointer text-rose-600 text-2xl">
            </div>
            </div>
        </div>
    </div>
    )
}

export default TodoList