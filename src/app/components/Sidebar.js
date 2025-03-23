"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function Item({ label, path, icon }) {
    return (
        <li
            className="p-2.5 cursor-pointer rounded-[8px] my-1 focus:bg-[#b2c2f6]"
            tabIndex="0">
            <i className={icon}></i>
            <Link
                href={`/${path}`}
                className="ml-2.5 font-medium">{ label }</Link>
        </li>
    );
}

export default function Sidebar() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null
    };
    return (
        <nav className="absolute flex flex-col items-center h-full w-full sm:w-[300px] lg:w-[400px] bg-[#c9d6ff]">
            <div className="w-full h-full flex flex-col">
                <div className="w-full p-4">
                    <input
                        id="search"
                        placeholder="Buscar"
                        type="text"
                        className="block min-w-0 grow bg-white p-1 rounded-[8px] w-full"/>
                </div>

                <div className="p-4 w-full">
                    <ul>
                        <Item label={"Dashboard"} path="dashboard" icon="fa-solid fa-house"/>
                        <Item label={"Calendario"} path={"calendar"} icon="fa-solid fa-calendar"/>  
                        <Item label={"Mi día"} path={"myday"} icon="fa-solid fa-sun"/>
                    </ul>
                </div>

                <div className="my-2 h-[2px] bg-[rgba(100,103,209,0.5)] w-[95%]"></div>

                <div className="p-4 w-full">
                    <ul>
                        <Item label={"Escuela"} path="escuela" icon="fa-solid fa-bars"/>
                        <Item label={"Cocina"} path={"cocina"} icon="fa-solid fa-bars"/>  
                        <Item label={"Personal"} path={"personal"} icon="fa-solid fa-bars"/>
                        <Item label={"Social"} path={"social"} icon="fa-solid fa-bars"/>
                    </ul>
                </div>

                <div className="p-4 w-full mt-auto">
                    <ul>
                        <Item label={"Nueva lista"} path="lista" icon="fa-solid fa-plus"/>
                    </ul>
                </div>
            </div>
        </nav>
    );
}