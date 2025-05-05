"use client";
import Image from 'next/image';
import logo from 'public/logo-sm.png';
import Link from "next/link";
import { useEffect, useState } from 'react';

function Item({ label, path, icon, onClick }) {
    return (
        <li
            className="p-2.5 cursor-pointer rounded-[8px] my-1 focus:bg-[#b2c2f6] hover:bg-[#b2c2f6] active:bg-[#b2c2f6] flex items-center"
            tabIndex="0"
            onClick={onClick}
        >
            <i className={icon} aria-hidden="true"></i>
            {path ? (
                <Link href={`/${path}`} className="ml-2.5">{label}</Link>
            ) : (
                <span className="ml-2.5">{label}</span>
            )}
        </li>
    );
}

export default function Sidebar() {
    const [lists, setLists] = useState([]);
    const [isCreatingList, setIsCreatingList] = useState(false);
    const [newListName, setNewListName] = useState('');

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const userUuid = window.localStorage.getItem("user_uuid");
                if (!userUuid) return;
                
                const response = await fetch(`http://localhost:3000/api/lists?userUuid=${userUuid}`);
                if (response.ok) {
                    const data = await response.json();
                    setLists(data.lists || []);
                }
            } catch (error) {
                console.error('Error al cargar las listas:', error);
            }
        };
        fetchLists();
    }, []);

    const handleCreateList = async () => {
        if (!newListName.trim()) return;
        try {
            const response = await fetch('http://localhost:3000/api/lists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify({
                    name: newListName.trim(),
                    color: 'ffffff',
                    userUuid: window.localStorage.getItem("user_uuid")
                }),
            });
            if (response.ok) {
                const newList = await response.json();
                setLists([...lists, newList.list]);
                setNewListName('');
                setIsCreatingList(false);
            }
        } catch (error) {
            console.error('Error al crear la lista:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCreateList();
        }
    };

    return (
        <nav className="flex flex-col items-center h-full w-full sm:w-[230px] lg:w-[260px] bg-[#c9d6ff]">
            <div className="w-full h-full flex flex-col">
                <div className="flex flex-col items-center">
                    <Image
                        src={logo}
                        alt="Taskit logo"
                        width={200}
                        height={200}
                        className="p-4"
                    />
                </div>
                <div className="w-full p-4 -mb-4">
                    <input
                        id="search"
                        placeholder="  Buscar"
                        type="text"
                        className="block bg-white p-1 rounded-md w-full" />
                </div>

                <div className="p-4 w-full">
                    <ul>
                        <Item label={"Dashboard"} path="dashboard" icon="fa-solid fa-house" />
                        <Item label={"Calendario"} path={"calendar"} icon="fa-solid fa-calendar" />
                    </ul>
                </div>

                <div className="my-2 mr-1 ml-1 h-[2px] bg-[rgba(100,103,209,0.5)] w-[95%]"></div>

                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 w-full">
                        <ul>
                            {lists.map((list) => (
                                <Item 
                                    key={list.uuid} 
                                    label={list.name} 
                                    path={`list/${list.uuid}`} 
                                    icon="fa-solid fa-list" 
                                />
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="p-4 w-full mt-auto">
                    <ul>
                        {isCreatingList ? (
                        <li className="p-2.5 rounded-[8px] my-1 flex items-center">
                            <i className="fa-solid fa-plus" aria-hidden="true"></i>
                            <input
                                type="text"
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                                onKeyPress={handleKeyPress}
                                onBlur={() => setIsCreatingList(false)}
                                autoFocus
                                placeholder="Nombre de la lista"
                                className="ml-2.5 bg-white p-1 rounded-md w-full"
                            />
                        </li>
                        ) : (
                        <Item 
                            label={"Nueva lista"} 
                            path={null} 
                            icon="fa-solid fa-plus" 
                            onClick={() => setIsCreatingList(true)}
                        />
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}