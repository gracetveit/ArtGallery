import { GetStaticProps } from 'next';
import Header from './header';
import Footer from './footer';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {}
    }
}

export default function Layout({children}: {children: HTMLElement}) {
    return (
        <div>
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    )
}