import { useEffect, useState } from 'react'
import Message from './Message'

import CloseBtn from '../img/cerrar.svg'

export default function Modal({
    setModal,
    animateModal,
    setAnimateModal,
    saveCost,
    editCost,
    setEditCost,
}) {
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [id, setId] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        if (Object.keys(editCost).length) {
            setName(editCost.name)
            setAmount(editCost.amount)
            setCategory(editCost.category)
            setId(editCost.id)
            setDate(editCost.date)
        }
    }, [])

    const hideModal = () => {
        setAnimateModal(false)

        setTimeout(() => {
            setModal(false)
            setEditCost({})
        }, 300)
    }

    const handleSubmit = e => {
        e.preventDefault()

        if ([name, amount, category].includes('')) {
            setMessage('Todos los campos son obligatorios')

            setTimeout(() => {
                setMessage('')
            }, 5000)
            return
        }

        saveCost({ name, amount, category, id, date })
        hideModal()
    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img src={CloseBtn} alt='Cerrar' onClick={hideModal} />
            </div>

            <form
                className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}
                onSubmit={handleSubmit}
            >
                <legend>
                    {editCost.name ? 'Editar Gasto' : 'Nuevo Gasto'}
                </legend>
                {message && <Message type='error'>{message}</Message>}
                <div className='campo'>
                    <label htmlFor='name'>Nombre Gasto</label>
                    <input
                        id='name'
                        type='text'
                        placeholder='Añade el Nombre del Gasto'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor='amount'>Cantidad</label>
                    <input
                        id='amount'
                        type='number'
                        placeholder='Añade la Cantidad del Gasto: ej. 300'
                        value={amount}
                        onChange={e => setAmount(Number(e.target.value))}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor='category'>Categoría</label>
                    <select
                        id='category'
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value=''>-- Selecciona --</option>
                        <option value='ahorro'>Ahorro</option>
                        <option value='comida'>Comida</option>
                        <option value='casa'>Casa</option>
                        <option value='gastos'>Gastos varios</option>
                        <option value='ocio'>Ocio</option>
                        <option value='salud'>Salud</option>
                        <option value='suscripciones'>Suscripciones</option>
                    </select>
                </div>

                <input
                    type='submit'
                    value={editCost.name ? 'Guardar Cambios' : 'Añadir Gasto'}
                />
            </form>
        </div>
    )
}
