import { GetStaticProps } from 'next';
import Link from 'next/link'

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {}
    }
}

export default function Art() {
    return (
        <div>
            <p>This is a Post</p>
        </div>
    )
}