import { GetStaticProps } from 'next';

import Layout from '../../components/layout';
import Gallery from '../../components/gallery';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {}
    }
}

export default function Home() {
    return (
        <Layout>
            <Gallery />
        </Layout>
    )
}