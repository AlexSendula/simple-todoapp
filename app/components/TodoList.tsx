import React from 'react'
import { ITask } from '@/types/tasks'
import Task from './Task'

interface TodoListProps {
  tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead className='bg-slate-200 rounded'>
          <tr>
            <th className='rounded-l-md'>Task</th>
            <th className='rounded-r-md'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => <Task key={task.id} task={task}/>)}
          
        </tbody>
      </table>
    </div>
  )
}

export default TodoList