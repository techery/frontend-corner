import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Slogan APP</title>
      </Head>

      <main>
        <ul>
            <li><a href="/csr">CSR - Client Side Rendering</a></li>
            <li><a href="/pseudo-ssg">Pseudo SSG - Static Site Generation</a></li>
            <li><a href="/ssr">SSR - Server Side Rendering</a></li>
        </ul>
      </main>

      <style global jsx>{`
        ul{
            padding: 100px;
        }
        
        li{
            padding-bottom: 30px;
        }
      `}</style>
    </div>
  )
}