import { useState } from "react"
import { IMaskInput } from "react-imask";
import { toast } from "react-toastify";
import SelectTechnology from "./SelectTechnology/SelectTechnology";
import SelectCity from "./SelectCity/SelectCity";


export default function Form() {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [technology, setTechnology] = useState(null);
    const [city, setCity] = useState(null);
    const [pasport, setPasport] = useState('');
    const [errors, setErrors] = useState(null);

    const handleClick = (e) => {
        e.preventDefault();

        if (!name) {
            setErrors(prev => ({
                ...prev,
                name: 'Введите имя!'
            }))
            toast.error('Введите имя!');
        }

        if (!phone) {
            setErrors(prev => ({
                ...prev,
                phone: 'Введите номер телефона!'
            }))
            toast.error('Введите номер телефона!');
        } else if (phone.length < 18) {
            setErrors(prev => ({
                ...prev,
                phone: 'Телефон введен не верно!'
            }))
            toast.error('Телефон введен не верно!');
        }

        if (!name || !phone) return

        toast.success('Успешно');
    }

    return (
        <form className="col">
            <h2>Оставить заявку</h2>

            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Имя" />

            <IMaskInput
                placeholder="Телефон"
                mask="+7 (000) 000-00-00"
                placeholderChar="_"
                lazy={!Boolean(phone)}
                value={phone}
                onAccept={value => setPhone(value)}
                onComplete={(value, mask) => { // При завершении ввода
                    toast.info('Номер успешно введен. Value - ' + value)
                }}
                onFocus={() => {
                    if (phone == '') setPhone('+7 (')
                }}
                onBlur={() => {
                    if (phone == '+7 (___) ___-__-__') setPhone('')
                }}
            />

            <SelectTechnology
                value={technology}
                onChange={setTechnology}
            />

            <SelectCity
                value={city}
                onChange={setCity}
            />

            <IMaskInput
                placeholder="Серия и номер паспорта"
                mask="0000 - 000000"
                placeholderChar="_"
                lazy={!Boolean(pasport)}
                value={pasport}
                onAccept={value => setPasport(value)}
                onComplete={(value, mask) => { // При завершении ввода
                    toast.info('Паспортные данные введены успешно. Value - ' + value)
                }}
                onFocus={() => {
                    if (pasport == '') setPasport('____ - ______')
                }}
                onBlur={() => {
                    if (pasport == '____ - ______') setPasport('')
                }}
            />

            <button onClick={handleClick}>Отправить</button>
        </form>
    )
}