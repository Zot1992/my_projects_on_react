import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { IMaskInput } from "react-imask"
import SelectorCity from "./Selector-City/SelectorCity"
import selectCityStyles from "../../../Project_1/src/components/SelectCity/selectCity";
import schema from "./schema";


export default function Form() {

    const {
        register,
        handleSubmit,
        control,
        getValues,
        setValue,
        formState: { errors, isDirty, isValid }
    } = useForm({
        defaultValues: {
            name: null,
            surname: null,
            email: null,
            city: null,
            street: null,
            house: null,
        },
        resolver: yupResolver(schema),
    })


    const sabmit = (values) => {
        console.log(values)
    }

    return (
        <form onSubmit={handleSubmit(sabmit)} className="container">
            <h2>Оформление заказа</h2>

            <div className="row insert">
                <div className="field--name">
                    <input type="text"
                        placeholder="Имя"
                        {...register('name')}
                        style={errors.name && { borderColor: 'red' }}
                    />
                    {errors.name && <p className="text-error">{errors.name.message}</p>}
                </div>

                <div className="field--surname">
                    <input type="text"
                        placeholder="Фамилие"
                        {...register('surname')}
                        style={errors.surname && { borderColor: 'red' }}
                    />
                    {errors.surname && <p className="text-error">{errors.surname.message}</p>}
                </div>
            </div>

            <div className="row insert">
                <div className="field--phone">
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <IMaskInput
                                {...field}
                                mask='+7(000) 000-00-00'
                                placeholder="Телефон"
                                onAccept={(value) => field.onChange(value)}
                                onFocus={() => {
                                    if (!getValues('phone')) setValue('phone', '+7 (');
                                }}
                                onBlur={() => {
                                    if (getValues('phone') === '+7 (') setValue('phone', '');
                                }}
                                style={errors.phone && { borderColor: 'red' }}
                            />
                        )}
                    />
                    {errors.phone && <p className="text-error">{errors.phone.message}</p>}
                </div>

                <div className="field--Email">
                    <input type="text"
                        placeholder="Email"
                        {...register('email')}
                        style={errors.email && { borderColor: 'red' }}
                    />
                    {errors.email && <p className="text-error">{errors.email.message}</p>}
                </div>

            </div>

            <div className="row insert">
                <div className="field--city">
                    <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                            <SelectorCity
                                value={field.value}
                                onChange={(selectedOption) => field.onChange(selectedOption)}
                                styles={selectCityStyles(errors.city)}
                            />
                        )}
                    />
                    {errors.city && <p className="text-error">{errors.city.message}</p>}
                </div>

                <div className="field--street">
                    <input type="text"
                        placeholder="Улица"
                        {...register('street')}
                        style={errors.street && { borderColor: 'red' }}
                    />
                    {errors.street && <p className="text-error">{errors.street.message}</p>}
                </div>

                <div className="field--house">
                    <input type="text"
                        placeholder="Дом"
                        {...register('house')}
                        style={errors.house && { borderColor: 'red' }}
                    />
                    {errors.house && <p className="text-error">{errors.house.message}</p>}
                </div>

            </div>


            <button type="submit">Оформить заказ</button>
        </form>
    )
}