export type TodoItemType = {
    date: Date,
    name: string,
    createdOn: Date,
    finished: boolean,
}

export type TodoItemProps = {
    todoItem: TodoItemType,
    removeItem: (item : TodoItemType) => void,
    finishTask: (item : TodoItemType) => void,
    moveItem: (up : boolean, item : TodoItemType) => void
}

export type NewTodoProps = {
    date: Date,
    onCreate: (taskName : string) => void
    cancelCreate: () => void
}
  
export {}