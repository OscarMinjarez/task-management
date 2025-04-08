import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export default function Header({ username = "Usuario" }) {
    // Obtener la fecha actual formateada
    const getCurrentDate = () => {
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        return new Date().toLocaleDateString('es-ES', options);
    };

    return (
        <header className="mb-8">
            <div className="flex items-start">
                <div className="pt-1">
                    <FontAwesomeIcon
                        icon={faHouse}
                        className="text-[#625f5f] text-[20px]"
                        style={{
                            width: '23px',
                            height: '23px'
                        }}
                    />
                </div>
                <h1 className="text-2xl font-bold text-[#625f5f] ml-2">Dashboard</h1>
            </div>
            <div>
                <div className='bg-[#c9d6ff] mt-4 py-3 px-6 w-full rounded-xl'>
                    <div className="flex items-center gap-4 mt-1">
                        <p className="text-lg text-black font-bold">¡Hola {username}!</p>
                    </div>
                    <div className='flex items-center gap-4 mt-1'>
                        <p className="text-lg text-black">{getCurrentDate()}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}