const Message = ({ message, messages }) => {
    return (
        <div
            className="fixed top-0 right-0 z-50"
            style={{
                transform: `translateY(${messages.indexOf(message) * 50}px)`,
                opacity: message.visible ? 1 : 0
            }}
        >
            <div
                className="bg-white p-4 rounded shadow mt-4 mr-4 transition-all duration-300 transform"
                style={{ width: 'auto', maxWidth: '300px' }}
            >
                <p>{message.text}</p>
            </div>
        </div>
    );
};

export default Message