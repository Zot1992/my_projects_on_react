export const ErrorMessage = ({ error }) => {

    return (
        <div className="bg-red-100 border-2 border-red-500 rounded-8 p-5 flex items-center gap-4 py-4">
            <div>
                <h3 className="text-red-500 text-2xl mb-2">
                    Ошибка!
                </h3>
                <p className="">
                    <span className="text-red-500 text-2xl">{error}</span>
                </p>
            </div>
        </div>
    )
}