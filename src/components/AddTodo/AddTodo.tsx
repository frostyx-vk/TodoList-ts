import { useState } from 'react';
import { UpsertTodoProps } from '../../types';
import s from './AddTodo.module.css';



function AddTodo({ todo, setTodo }: UpsertTodoProps) {

    const [value, setValue] = useState('');

    function saveTodo(value: string) {
        if (value) {
            setTodo(
                [...todo, {
                    id: new Date().getTime().toString(),
                    title: value,
                    status: true
                }]
            )
            setValue('')
        }
    }

    return (
        <div className={s.addTodo}>
            <input 
            className={s.input} 
            placeholder='Введите задачу' 
            value={value} onChange={(e) => setValue(e.target.value)}
            onKeyPress = {e => e.key === 'Enter' && saveTodo(value)} />
            <button className={s.btn} onClick={(e) => saveTodo(value)}>Сохранить</button>
        </div>
    )
}

export default AddTodo
