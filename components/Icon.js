import Image from 'next/image'

const Icon = ({ slug }) => {
    return <Image
        src={`/icons/${slug}.svg`} 
        alt={`${slug} icon`}
        width={50}
        height={50}
    />
}
export default Icon