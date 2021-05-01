import Link from 'next/link'

export default function Home({test}: {test: string}) {
    return (
        <div>
            <Link href="/updates">
                <a>This site contains adult content</a>
            </Link>
        </div>
    )
}