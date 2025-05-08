import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCalendar, faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import UserLogo from 'public/user.png';
import { useRouter } from 'next/navigation';

export default function Header({
    username = "Usuario",
    points = 0,
    pageTitle = "Dashboard",
    pageIcon = "home"
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const router = useRouter();

    // Cerrar menú al hacer clic fuera
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Cierre de sesión
    const handleLogout = async () => {
        try {
            localStorage.removeItem('user_uuid');
            router.replace('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            router.replace('/login');
        }
    };

    const getPageIcon = () => {
        switch (pageIcon) {
            case 'calendar':
                return faCalendar;
            case 'list':
                return faBars;
            case 'home':
            default:
                return faHouse;
        }
    };

    return (
        <header className="mb-2 relative">
            <div className="flex justify-between items-start">
                {/* Sección izquierda */}
                <div className="flex items-start">
                    <div className="pt-1">
                        <FontAwesomeIcon
                            icon={getPageIcon()}
                            className="text-[#625f5f] text-[20px]"
                            style={{ width: '23px', height: '23px' }}
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-[#625f5f] ml-2">{pageTitle}</h1>
                </div>

                {/* Sección derecha */}
                <div className="flex items-center gap-2 relative">

                    {/* Contenedor usuario + avatar */}
                    <div
                        className="flex items-center gap-2 bg-[#e0e7ff] rounded-full pl-3 pr-1 py-1 cursor-pointer hover:bg-[#d0d7ff] transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <p className="font-bold text-[#625f5f]">{username}</p>
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent">
                            <Image
                                src={UserLogo}
                                alt={`Avatar de ${username}`}
                                width={32}
                                height={32}
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Puntos */}
                    <div className="bg-[#e0e7ff] rounded-full px-3 py-1">
                        <span className="text-[#4f46e5] font-bold">{points} pts</span>
                    </div>

                    {/* Menú desplegable */}
                    {isMenuOpen && (
                        <div
                            ref={menuRef}
                            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                        >
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                            >
                                <FontAwesomeIcon
                                    icon={faSignOutAlt}
                                    className="mr-2 text-[#625f5f]"
                                />
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}