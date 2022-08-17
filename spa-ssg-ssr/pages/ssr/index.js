import Head from 'next/head'
import UserData from '../user-data';
import {getUserData} from '../api';

export async function getServerSideProps() {
    const userData = await getUserData();
    return { props: { userData } }
}

export default function Ssr({userData}) {
    return (
        <div className="container">
            <Head>
                <title>Slogan APP</title>
            </Head>

            <main>
                <h3 className="title">
                    Welcome to <a href="/">Slogan APP</a> - SSR
                </h3>

                <UserData userData={userData}></UserData>
            </main>
        </div>
    )
}