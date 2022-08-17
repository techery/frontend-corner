import Head from 'next/head'
import { useEffect, useState } from 'react';

import UserData from '../user-data';

export default function Csr() {
    const [mounted, setMounted] = useState(false);
    const [userData, setUserData] = useState({name: '-', desc: '-'});

    useEffect(async () => {
        setMounted(true);

        const res = await fetch(`/api`);
        const userData = await res.json();
        setUserData(userData);
    }, []);

    return !mounted ? null : (
        <div className="container">
            <Head>
                <title>Slogan APP</title>
            </Head>

            <main>
                <h3 className="title">
                    Welcome to <a href="/">Slogan APP</a> - client-side rendering
                </h3>

                <UserData userData={userData}></UserData>
            </main>
        </div>
    )
}