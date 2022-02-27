import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import React, { useEffect, useState } from 'react';
import "./main-page.scss";
import ToDoAdd from './ToDoAdd';

const ToDoDetail = (props) => {
    const { eachItem, handleDeleteItemTodo, handleUpdateItemTodo, handleCheck, handleRemoveCheck } = props
    const [displayAddToDo, setDisplayAddToDo] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [check, setCheck] = useState(false)

    const handlePopup = () => {
        setDisplayAddToDo(!displayAddToDo)
        setIsUpdate(true)
    }
    useEffect(() => {
        check && handleCheck(eachItem.id)
        !check && handleRemoveCheck(eachItem.id)
        // eslint-disable-next-line
    }, [check])
    return (

        <div className="ToDoDetail py-2" >
            <Card
                className="w-12"
            >
                <div className='flex lg:flex-row flex-column justify-content-between'>
                    <div className="content-todo lg:w-8 w-12 text-todo flex align-items-center">
                        <Checkbox
                            onChange={e => setCheck(e.checked)}
                            checked={check}></Checkbox>
                        <span className="pl-2">{eachItem.title}</span>
                    </div>
                    <div className="todo-list lg:w-4 w-12">
                        <div className="flex lg:justify-content-end justify-content-start lg:flex-row flex-column">
                            <Button
                                label="Detail"
                                type="button"
                                icon="pi pi-chevron-down"
                                className="p-button-info lg:my-0 my-2 lg:w-auto w-12"
                                onClick={handlePopup}
                                aria-haspopup
                                aria-controls="overlay_panel"
                            />
                            <Button
                                label="Remove"
                                icon="pi pi-trash"
                                className="p-button-danger lg:ml-2 ml-0 lg:w-auto w-12"
                                onClick={() => handleDeleteItemTodo(eachItem.id)}
                            />
                        </div>
                    </div>
                </div>
            </Card>
            <ToDoAdd
                isUpdate={isUpdate}
                eachItem={eachItem}
                handleAddNewItemTodo={handleUpdateItemTodo}
                displayAddToDo={displayAddToDo}
                handlePopup={handlePopup} />
        </div>
    );
}

export default ToDoDetail;
