"use-client";
import { useEffect, useState } from "react";

export default function UserLists() {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLists() {
            const userUuid = localStorage.getItem("user_uuid");
            if (!userUuid) return;
            try {
                const res = await fetch(`/api/lists?userUuid=${userUuid}`);
                const data = await res.json();
                setLists(data.lists || []);
            } catch (error) {
                console.error("Error al obtener listas:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchLists();
    }, []);
    return { lists, loading };
}
