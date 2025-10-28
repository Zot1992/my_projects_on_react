import { useState } from "react";

// Универсальная функция для работы с модальным окном
const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);


    const openModal = () => {
        setIsOpen(true);
    };


    const closeModal = () => {
        setIsOpen(false);
    };

    return {
        isOpen,
        openModal,
        closeModal
    };
};

export default useModal