import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {}
    }
}

export default function Post() {
    return (
        <div>
            <p>[ContactInfo]</p>
            <p>[CopyrightInfo]</p>
        </div>
    )
}