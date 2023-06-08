"use client"

import React, { FormEventHandler, useState } from 'react'
import { ITask } from '@/types/tasks'
import { FiEdit, FiTrash } from 'react-icons/Fi'
import Modal from './Modal'
import { deleteTodo, editTodo } from '@/api'

interface TaskProps {
  task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text)

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit
    });
    setTaskToEdit(taskToEdit);
    setOpenModalEdit(false)
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDelete(false);
  }

  return (
    <tr key={task.id}>
      <td className='w-full'>{task.text}</td>
      <td className='flex gap-5'>
      <FiEdit onClick={() => setOpenModalEdit(true)} cursor='pointer' className='text-amber-400' size={22} />
      <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
        <form onSubmit={handleSubmitEditTodo}>
          <h3 className='font-bold text-lg'>Edit task</h3>
          <div className='modal-action'>
          <input
            type="text" 
            value={taskToEdit}
            onChange={(e) => setTaskToEdit(e.target.value)}
            placeholder="Type here" 
            className="input input-bordered w-full" 
          />
          <button type='submit' className="btn">Submit</button>
          </div>
        </form>
      </Modal>

      <FiTrash onClick={() => setOpenModalDelete(true)} cursor='pointer' className='text-red-500' size={22} />
      <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
        <h3 className='text-lg'>Are you sure?</h3>
        <div className='modal-action'>
          <button
            onClick={() => handleDeleteTask(task.id)}
            className='btn btn-error'
            >
            Delete
          </button>
        </div>
      </Modal>
      </td>
    </tr>
  )
}

export default Task


