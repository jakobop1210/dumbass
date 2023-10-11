import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { formatDateString } from '../../lib/utils'
import RatingStars from '../atoms/RatingStars'
import { useNavigate } from 'react-router-dom'

export type ArtistCardProps = {
    cardType: 'artist'
    imageUrl?: string
    id: string
    title: string
    alternateNames: string[]
    rating: number
    numOfRatings: number
}

export type SongCardProps = {
    cardType: 'song'
    imageUrl?: string
    id: string
    title: string
    artist: string
    rating: number
    numOfRatings: number
    releaseDate: string
}

const ArtistSongCard = (props: ArtistCardProps | SongCardProps) => {
    const navigate = useNavigate()
    let subtitle = ''
    let urlTo = `/song/:${props.id}`
    if (props.cardType === 'artist') {
        urlTo = `/artist/:${props.id}`
    }

    if (props.cardType === 'artist') {
        subtitle = props.alternateNames.length
            ? `AKA: ${props.alternateNames.join(', ')}`
            : props.title
    } else if (props.cardType === 'song') {
        subtitle = `by ${props.artist}`
    }

    return (
        <div
            onClick={() => navigate(urlTo)}
            className='sm:p-3 p-2 gap-3 rounded-xl flex items-center bg-white text-blueGray cursor-pointer shadow hover:shadow-lg transition-all'>
            <img
                className='aspect-square rounded-xl w-16 h-16 sm:w-24 sm:h-24 object-cover'
                src={props.imageUrl}
                alt='Image'
                role='ArtistSongCard-image'
            />

            <div className='flex flex-col justify-between w-full max-w-full truncate sm:gap-2'>
                <div>
                    <div
                        className='text-lg font-medium font-sans truncate'
                        role='ArtistSongCard-title'>
                        {props.title}
                    </div>
                    <div
                        className='text-sm truncate sm:block hidden -mt-1'
                        role='ArtistSongCard-subtitle'>
                        {subtitle}
                    </div>
                </div>
                <div className='text-sm flex sm:gap-x-5 gap-x-2 gap-y-0 max-[400px]:flex-col flex-wrap'>
                    {/* STARS */}
                    <RatingStars
                        rating={props.rating}
                        changeToOne={true}
                        color='yellow'
                        numOfRatings={props.numOfRatings}
                    />
                    {/* RELEASAE DATE */}
                    {props.cardType === 'song' && (
                        <div className='flex gap-1 items-center'>
                            <div
                                className='truncate'
                                role='ArtistSongCard-releaseDate'>
                                {formatDateString(props.releaseDate)}
                            </div>
                            <FontAwesomeIcon icon={faCalendarDays} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ArtistSongCard
