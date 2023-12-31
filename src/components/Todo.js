import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Todo() {
    const [itemText, setItemText] = useState('');
    const [listItems, setListItems] = useState([]);
    const [isUpdating, setIsUpdating] = useState('');
    const [updateItemText, setUpdateItemText] = useState('');

    const addItem = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/item', { item: itemText })
            setListItems(prev => [...prev, res.data]);
            setItemText('');
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const getItemsList = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/items')
                setListItems(res.data);
                // console.log('render')
            } catch (err) {
                console.log(err);
            }
        }
        getItemsList()
    }, []);

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/item/${id}`)
            const newListItems = listItems.filter(item => item._id !== id);
            setListItems(newListItems);
        } catch (err) {
            console.log(err);
        }
    }

    const updateItem = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:5000/api/item/${isUpdating}`, { item: updateItemText })
            // console.log(res.data)
            const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
            listItems[updatedItemIndex].item = updateItemText;
            setUpdateItemText('');
            setIsUpdating('');
        } catch (err) {
            console.log(err);
        }
    }

    const renderUpdateForm = (item) => (
        <form className="update-form" onSubmit={(e) => { updateItem(e) }} >
            <input className="update-new-input" type="text" placeholder={`${item.item}`} onChange={e => { setUpdateItemText(e.target.value) }} value={updateItemText} />
            <button className="update-new-btn" type="submit">Update</button>
        </form>
    )
    return <>
        <form className="form" onSubmit={e => addItem(e)}>
            <input type="text" placeholder='Add Todo Item' onChange={e => { setItemText(e.target.value) }} value={itemText} />
            <button type="submit">Add</button>
        </form>
        <div className="todo-listItems">
            {
                listItems.map(item => (
                    <div key={item._id} className="todo-item">
                        {
                            isUpdating === item._id
                                ? renderUpdateForm(item)
                                : <>
                                    <p className="item-content">{item.item}</p>
                                    <button className="update-item" onClick={() => { setIsUpdating(item._id) }}>Update</button>
                                    <button className="delete-item" onClick={() => { deleteItem(item._id) }}>Delete</button>
                                </>
                        }
                    </div>
                ))
            }
        </div>
    </>

}

