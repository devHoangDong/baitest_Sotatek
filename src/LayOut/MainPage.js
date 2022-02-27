import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useState } from 'react';
import { useMyContext } from '../AppContext/MyAppContext';
import "./main-page.scss";
import ToDoAdd from './ToDoAdd';
import ToDoDetail from './ToDoDetail';


const MainPage = () => {
    const { updateMyTodoList, myList } = useMyContext()
    const iniList = myList ? myList : []
    const [listTodo, setListTodo] = useState(iniList)
    const [listCheck, setListCheck] = useState([])
    const [displayAddToDo, setDisplayAddToDo] = useState(false)
    const [inputText, setInputText] = useState("");

    const handleAddNewItemTodo = (dataItem) => {
        let index = listTodo.length + 1
        dataItem["id"] = index;
        let newData = [
            ...listTodo
        ];
        newData.push(dataItem)
        newData.sort(compareDate)
        setListTodo(newData)
    }
    const handleUpdateItemTodo = (dataItem) => {
        let newData = [
            ...listTodo
        ];
        let index = newData.findIndex(e => e.id === dataItem.id)
        newData.splice(index, 1, dataItem)
        setListTodo(newData)
        window.location.reload(false);
    }
    const compareDate = (a, b) => {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    }
    const handleDeleteItemTodo = (id) => {
        let index = listTodo.findIndex(e => (e.id) === id)
        let newData = [
            ...listTodo,
        ];
        newData.splice(index, 1)
        newData.map((e, index) => e.id = index + 1)
        setListTodo(newData)
    }
    const handlePopup = () => {
        setDisplayAddToDo(!displayAddToDo)
    }
    const handleCheck = (id) => {
        setListCheck(prevState => [...prevState, id])
    }
    const handleRemoveCheck = (id) => {
        let newList = [...listCheck]
        let index = newList.indexOf(id)
        newList.splice(index, 1)
        setListCheck(newList)
    }
    const handleRemoveMulti = (arrId) => {
        let newData = [
            ...listTodo,
        ]
        arrId.forEach(id => {
            let index = newData.findIndex(e => e.id === id)
            newData.splice(index, 1)
        })
        newData.map((e, index) => e.id = index + 1)
        console.log('newData: ', newData);
        setListTodo(newData)
    }
    const inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    }
    const filteredData = listTodo.filter((el) => {
        if (inputText === '') {
            return el;
        } else {
            return el.title.toLowerCase().includes(inputText)
        }
    })
    const rightContents = (
        <>
            <Button label="Done" icon="pi pi-check" className="mr-2" />
            <Button label="Remove" icon="pi pi-trash" className="p-button-danger" onClick={() => handleRemoveMulti(listCheck)} />
        </>
    );
    useEffect(() => {
        updateMyTodoList(listTodo);
        // eslint-disable-next-line
    }, [listTodo])
    useEffect(() => {
        console.log('listCheck: ', listCheck)
        // eslint-disable-next-line
    }, [listCheck])

    return (

        <div className="MainPage flex py-5 justify-content-center">
            <Card
                className="w-8 pt-0 flex justify-content-center"
                title="Todo List"
            >
                <div className="w-12">
                    <div className="todo-list w-12">
                        <div className="grid">
                            <div className="col-12">
                                <div className="p-inputgroup flex">
                                    <InputText
                                        id="content"
                                        name="content"
                                        className=""
                                        placeholder="Search..."
                                        onChange={inputHandler}
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <Button
                                    icon="pi pi-plus"
                                    label="Add new todo"
                                    className="p-button-primary"
                                    onClick={() => handlePopup()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {filteredData && filteredData.map(item => {
                        return <ToDoDetail
                            handleUpdateItemTodo={handleUpdateItemTodo}
                            handleDeleteItemTodo={handleDeleteItemTodo}
                            eachItem={item}
                            handleCheck={handleCheck}
                            handleRemoveCheck={handleRemoveCheck}
                        />
                    })}
                </div>
                <ToDoAdd
                    handleAddNewItemTodo={handleAddNewItemTodo}
                    displayAddToDo={displayAddToDo}
                    handlePopup={handlePopup} />
                {listCheck.length > 0 && <div>
                    <Toolbar left={"Bulk action:"} right={rightContents} />
                </div>}
            </Card>
        </div>
    );
}

export default MainPage;
