import Footer from './Footer'
import { Fragment } from 'react'
import Head from 'next/head'
import Header from './Header'

const Layout = ({ children }) => {
    return <Fragment>
        <Head>
            <title>IST 363 Restaurants</title>
            <meta name="description" content="This is a description about our project"></meta>
        </Head>
        <Header />
        <main>
            {children}
        </main>
        <Footer />
    </Fragment>
}
export default Layout