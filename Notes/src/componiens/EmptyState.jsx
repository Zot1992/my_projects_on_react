export const EmptyState = ({ message, icon }) => {
    return (
        <div className="flex flex-row justify-center mb-6 mt-6">
            {icon && (<span className="text-6xl mb-4">{icon}</span>)}
            <p className="text-amber-600 text-3xl">{message}</p>
        </div>
    )
}