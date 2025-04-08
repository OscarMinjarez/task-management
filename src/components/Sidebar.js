"use client";
import Image from 'next/image';
import logo from 'public/logo-sm.png';

import { useEffect, useState } from "react";
import Link from "next/link";

function Item({ label, path, icon }) {
    return (
        <li
            className="p-2.5 cursor-pointer rounded-[8px] my-1 focus:bg-[#b2c2f6] hover:bg-[#b2c2f6]"
            tabIndex="0">
            <i className={icon} aria-hidden="true"></i>
            <Link
                href={`/${path}`}
                className="ml-2.5">{label}</Link>
        </li>
    );
}

export default function Sidebar() {
    return (
        <nav className="flex flex-col items-center h-full w-full sm:w-[230px] lg:w-[260px] bg-[#c9d6ff]">
            <div className="w-full h-full flex flex-col">
                <div className="flex flex-col items-center">
                    <Image
                        src={logo}
                        alt="Taskit logo"
                        width={200}
                        height={200}
                        className="mt-4 mb-4"
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
                        <Item label={"Mi día"} path={"myday"} icon="fa-solid fa-sun" />
                    </ul>
                </div>

                <div className="my-2 mr-1 ml-1 h-[2px] bg-[rgba(100,103,209,0.5)] w-[95%]"></div>

                <div className="p-4 w-full">
                    <ul>
                        <Item label={"Escuela"} path="escuela" icon="fa-solid fa-bars" />
                        <Item label={"Cocina"} path={"cocina"} icon="fa-solid fa-bars" />
                        <Item label={"Personal"} path={"personal"} icon="fa-solid fa-bars" />
                        <Item label={"Social"} path={"social"} icon="fa-solid fa-bars" />
                    </ul>
                </div>

                <div className="p-4 w-full mt-auto">
                    <ul>
                        <Item label={"Nueva lista"} path="lista" icon="fa-solid fa-plus" />
                    </ul>
                </div>
            </div>
        </nav>
    );
}