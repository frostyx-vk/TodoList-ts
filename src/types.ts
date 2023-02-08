export interface UpsertTodoProps {
    todo: Todo[];
    setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export interface Todo {
    id: string;
    title: string;
    status: boolean;
}