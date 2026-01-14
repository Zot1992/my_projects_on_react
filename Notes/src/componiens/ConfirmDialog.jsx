
export const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onCancel}>
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center gap-4">
                        <h3 className="text-2xl font-bold">{title}</h3>
                        <p>{message}</p>
                    </div>
                    <div className="flex flex-row gap-4">
                        <button className="border-2 pr-2 pl-2 border-transparent rounded-2xl text-gray-600 font-semibold cursor-pointer transition-all duration-300 
    hover:bg-blue-500 hover:text-white hover:border-blue-500"
                            onClick={onCancel}>Отмена</button>
                        <button className="border-2 pr-2 pl-2 border-transparent rounded-2xl bg-red-500 text-white font-semibold cursor-pointer transition-all duration-300 
    hover:bg-red-400  hover:border-red-300"
                            onClick={onConfirm}>Удалить</button>
                    </div>
                </div>
            </div>
        </div>

    )
}