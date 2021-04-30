import { GetStaticProps } from 'next';
import Link from 'next/link'

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {}
    }
}

export default function Header() {
    return (
        <div>
            <Link href="/updates">
                <h1>Updates</h1>
            </Link>
            <Link href="/art">
                <h1>Art</h1>
            </Link>
        </div>
    )
}