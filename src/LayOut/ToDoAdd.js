import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import React from 'react';
import * as Yup from "yup";
import "./main-page.scss";


const ToDoAdd = ({ displayAddToDo, handlePopup, handleAddNewItemTodo, eachItem, isUpdate }) => {
    const color = [
        { name: 'Low', code: 'low' },
        { name: 'Normal', code: 'normal' },
        { name: 'High', code: 'high' },
    ];
    // console.log('eachItem.date: ', eachItem.date);
    const emptyData = eachItem ? eachItem : {
        title: '',
        description: '',
        priority: "normal",
        date: new Date(),
    }
    const formik = useFormik({
        initialValues: emptyData,
        onSubmit: values => {
            handleAddNewItemTodo(values)
            handlePopup()
            formik.resetForm()
            window.location.reload(false)
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Vui lòng không để trống!"),
        })
    })
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    const SelectedTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div title={option.name} className="p-text-nowrap p-text-truncate">{option.name}</div>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }
    const OptionTemplate = (option, props) => {
        return (
            <div className="country-item" title={option.name}>
                <div className="p-text-nowrap p-text-truncate select-option-custom" style={{ color: option.code }}>{option.name}</div>
            </div>
        );
    }
    let minDate = new Date();
    const footer = () => {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" className="p-button-danger" type="button" onClick={handlePopup} />
                <Button label={isUpdate ? "Update" : "Add"} icon="pi pi-check" className="p-button-success" type="submit" onClick={() => formik.handleSubmit()} />
            </div>
        );
    }
    return (

        <div className="ToDoAdd py-2" >
            <Dialog
                header={isUpdate ? "Update Task" : "New Task"}
                visible={displayAddToDo}
                onHide={() => handlePopup()}
                breakpoints={{ '960px': '75vw' }}
                style={{ width: '50vw' }}
                footer={footer}>
                <div className="ToDoContent py-2" >
                    <div className="card">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="field pt-2">
                                <label htmlFor="title"
                                    className={classNames({ 'p-error': isFormFieldValid('title') })}
                                >
                                    Title
                            </label>
                                <InputText
                                    id="title"
                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    autoFocus
                                    className={classNames({ 'p-invalid': isFormFieldValid('title'), "w-12": true })}
                                />
                                {getFormErrorMessage('title')}
                            </div>
                            <div className="field">
                                <label htmlFor="description">Description</label>
                                <InputTextarea
                                    id="description"
                                    name="description"
                                    className="w-12"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    rows={5}
                                />
                            </div>
                            <div className="formgrid grid">
                                <div className="field col">
                                    <label htmlFor="username">Due Date</label>
                                    <Calendar
                                        id="date"
                                        name="date"
                                        className="w-12"
                                        value={formik.values.date}
                                        onChange={formik.handleChange}
                                        minDate={minDate}
                                        // maxDate={maxDate}
                                        readOnlyInput />
                                </div>
                                <div className="field col">
                                    <label htmlFor="username">Priority</label>
                                    <Dropdown
                                        id="priority"
                                        name="priority"
                                        value={formik.values.priority}
                                        options={color}
                                        className="w-12"
                                        optionLabel="name"
                                        optionValue="code"
                                        valueTemplate={SelectedTemplate}
                                        itemTemplate={OptionTemplate}
                                        onChange={formik.handleChange}
                                        placeholder="Select priority"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default ToDoAdd;
