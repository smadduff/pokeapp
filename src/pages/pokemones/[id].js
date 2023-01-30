import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Pokemon = ({ data }) => {
    const router = useRouter()

    if(router.isFallback){
        return <p>Cargando...</p>
    }
    return (
        <>
        <h1> {data.name} número #{data.id} </h1>
        <Image src={data.sprites.front_default} width={400} height={400}/>
        <Link  href="/">Volver al inicio</Link>
        </>
    )
}

export default Pokemon

export const getStaticProps = async ({ params }) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    const data = await response.json()

    return { props: { data } }
}

export const getStaticPaths = async () => {
    const paths = [
        {params: { id: '1' } },
        {params: { id: '2' } },
    ]
    return {
        paths,
        fallback: true,
    }
}

// export const getServerSideProps = async ({ params }) => {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
//     const data = await response.json()

//     return { props: { data } }
// }