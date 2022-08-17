import Head from 'next/head'
import { useEffect, useState } from 'react';

import UserData from '../user-data';

export default function PseudoSsg() {
    const [userData, setUserData] = useState({name: '-', desc: '-'});

    useEffect(async () => {
        const res = await fetch(`/api`);
        const userData = await res.json();
        setUserData(userData);
    }, []);

    return (
        <div className="container">
            <Head>
                <title>Slogan APP</title>
            </Head>

            <main>
                <h3 className="title">
                    Welcome to <a href="/">Slogan APP</a> - pseudo SSG
                </h3>

                <UserData userData={userData}></UserData>
            </main>
        </div>
    )
}