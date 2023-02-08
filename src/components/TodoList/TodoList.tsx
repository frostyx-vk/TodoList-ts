import { faEdit, faLock, faLockOpen, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { UpsertTodoProps } from '../../types';
import s from './TodoList.module.css'


function TodoList({ todo, setTodo }: UpsertTodoProps) {

    const [edit, setEdit] = useState<string | null>(null);
    const [value, setValue] = useState('');
    const [filtered, setFiltered] = useState(todo);

    useEffect(() => {
        setFiltered(todo)
    }, [todo])

    function todoFilter(status: string | boolean) {
        if (status === 'all') {
            setFiltered(todo)
        } else {
            let newTodo = [...todo].filter(item => item.status === status)
            setFiltered(newTodo)
        }
    }

    function deleteTodo(id: string) {
        const newTodo = [...todo].filter(item => item.id !== id)
        setTodo(newTodo)
    };

    function statusTodo(id: string) {
        const newTodo = [...todo].filter(item => {
            if (item.id === id) {
                item.status = !item.status
            }
            return item
        })
        setTodo(newTodo)
    };

    function editTodo(id: string, title: string) {
        setEdit(id);
        setValue(title);
    };

    function saveTodo(id: string) {
        const newTodo = [...todo].map(item => {
            if (item.id === id) {
                item.title = value
            }
            return item;
        }
        )
        setTodo(newTodo);
        setEdit(null);
    }

    return (
        <div >
            <button className={s.btn} onClick={() => todoFilter('all')}>Все</button>
            <button className={s.btn} onClick={() => todoFilter(true)}>Открытые</button>
            <button className={s.btn} onClick={() => todoFilter(false)}>Закрытые</button>
            {
                filtered.map(item => (
                    <div>
                        <div key={item.id} className={s.list}>
                            {
                                edit === item.id ?
                                    <div>
                                        <input className={s.input} value={value} onChange={(e) => setValue(e.target.value)} />
                                    </div> :
                                    <div className={!item.status ? s.close : ''}>
                                        {item.title}
                                    </div>
                            }

                            {
                                edit === item.id ?
                                    <div>
                                        <button className={s.btn} onClick={() => saveTodo(item.id)}><FontAwesomeIcon icon={faSave} /></button>
                                    </div> :
                                    <div className={s.btns}>
                                        <button className={s.btn} onClick={() => deleteTodo(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                        <button className={s.btn} onClick={() => editTodo(item.id, item.title)}><FontAwesomeIcon icon={faEdit} /></button>
                                        <button className={s.btn} onClick={() => statusTodo(item.id)}>
                                            {
                                                item.status ? <FontAwesomeIcon icon={faLockOpen} /> : <FontAwesomeIcon icon={faLock} />
                                            }
                                        </button>
                                    </div>
                            }
                        </div>
                    </div>
                ))
            }
        </div >
    )
}

export default TodoList
