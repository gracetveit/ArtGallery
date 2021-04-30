import { GetStaticProps } from 'next';
import Link from 'next/link'

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {}
    }
}

export default function Home() {
    return (
        <div>
            <Link href="/updates">
                <a>This site contains adult content</a>
            </Link>
        </div>
    )
}