import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCalendar, faBars } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import UserLogo from 'public/user.png';

export default function Header({
    username = "Usuario",
    points = 0,
    pageTitle = "Dashboard",
    pageIcon = "home"
}) {

    // íconos según la página
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
        <header className="mb-2">
            <div className="flex justify-between items-start">
                {/* Sección izquierda: ícono y título */}
                <div className="flex items-start">
                    <div className="pt-1">
                        <FontAwesomeIcon
                            icon={getPageIcon()}
                            className="text-[#625f5f] text-[20px]"
                            style={{
                                width: '23px',
                                height: '23px'
                            }}
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-[#625f5f] ml-2">{pageTitle}</h1>
                </div>

                {/* Usuario y puntos */}
                <div className="flex items-center">
                    <div className="flex items-center">
                        <p className="text-lg font-bold text-[#625f5f]">{username}</p>
                        <div className="ml-2">
                            <Image
                                src={UserLogo}
                                alt="User logo"
                                width={30}
                                height={30}
                                className="rounded-full"
                            />
                        </div>
                        <div className="bg-[#e0e7ff] rounded-full px-3 py-1 ml-2">
                            <span className="text-[#4f46e5] font-bold">{points} pts</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}