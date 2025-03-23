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
        <nav className="absolute block h-full w-full sm:w-[300px] lg:w-[400px] bg-[#e9eaed]">
            <div className="p-4">
                <ul>
                    <Item label={"Dashboard"} path="dashboard" icon="fa-solid fa-house"/>
                    <Item label={"Calendario"} path={"calendar"} icon="fa-solid fa-calendar"/>  
                    <Item label={"Mi día"} path={"myday"} icon="fa-solid fa-sun"/>
                </ul>
            </div>
        </nav>
    );
}