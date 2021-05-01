import { GetStaticProps } from 'next';

export default function PostList({list}: {list: string[]}) {
    return (
        <div>
            <ul>
                {
                    list.map((post) => (
                        <li>{post}</li>
                    ))
                }
            </ul>
        </div>
    )
}