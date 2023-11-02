import { useState } from 'react'
import Breadcrumb from '../atoms/Breadcrumb'
import { useLocation } from 'react-router-dom'
import RatingStars from '../atoms/RatingStars'
import {
    IconDefinition,
    faCalendarDays,
    faComments
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { customToast, formatDateString } from '../../lib/utils'
import Skeleton from 'react-loading-skeleton'
import Reviews from '../molecules/Reviews'
import { GeniusMusicPlayer } from '../molecules/GeniusMusicPlayer'

export type InfoPageTemplateProps = {
    isLoading: boolean
    title: string
    subtitle: string
    image: string
    averageRating: number
    numOfRatings: number
    description?: string[]
    lyrics?: string
    release_date?: string
    tabs: {
        title: string
        icon: IconDefinition
    }[]
    id: string
    type: 'artist' | 'song'

    handleFavoriteButtonClick: () => void
    isFavorite: boolean
}

export const InfoPageTemplate = (props: InfoPageTemplateProps) => {
    const [selectedTab, setSelectedTab] = useState<string>(props.tabs[0].title)

    const reviewsTab = {
        title: 'Reviews',
        icon: faComments
    }

    const tabs = [...props.tabs, reviewsTab]

    const location = useLocation()
    const from = location.state?.from

    return (
        <main>
            <Breadcrumb
                isLoading={props.isLoading}
                items={
                    from
                        ? [
                              {
                                  name: from[1].toUpperCase() + from.slice(2),
                                  link: from
                              },
                              {
                                  name: props.title
                              }
                          ]
                        : [
                              {
                                  name: props.title
                              }
                          ]
                }
            />

            {props.type === 'song' && <GeniusMusicPlayer id={props.id} />}
            <section className='flex items-center justify-center w-screen sm:p-12 lg:py-16 lg:px-32'>
                <article className='md:grid md:grid-cols-4 w-full max-w-4xl gap-10 bg-white sm:rounded-xl shadow p-5 pt-10 xs:p-10'>
                    <header className='flex flex-col xs:flex-row gap-5 justify-start xs:items-center md:block md:col-span-1 xs:mb-5 md:m-0'>
                        <figure className='aspect-w-1 aspect-h-1 md:w-full'>
                            {props.isLoading ? (
                                <Skeleton height={175} width={`100%`} />
                            ) : (
                                <div className='relative w-[10rem] h-[10rem] rounded-xl overflow-hidden shadow'>
                                    <img
                                        className='object-cover w-full h-full'
                                        src={props.image}
                                        alt={'Image of ' + props.title}
                                    />
                                </div>
                            )}
                        </figure>
                        <section className='md:mt-5 flex flex-col gap-2 xs:gap-5'>
                            <figcaption>
                                {props.isLoading ? (
                                    <Skeleton height={20} width={`75%`} />
                                ) : (
                                    <div className='text-lg font-medium'>
                                        {props.title}
                                    </div>
                                )}
                                {props.isLoading ? (
                                    <Skeleton height={15} width={`50%`} />
                                ) : (
                                    <div className='text-sm'>
                                        {props.subtitle}
                                    </div>
                                )}
                            </figcaption>
                            <div>
                                {props.isLoading ? (
                                    <Skeleton height={25} width={`75%`} />
                                ) : (
                                    <RatingStars
                                        rating={props.averageRating || 0}
                                        changeToOne={true}
                                        numOfRatings={props.numOfRatings || 0}
                                        color='yellow'
                                    />
                                )}
                                {props.isLoading ? (
                                    <Skeleton height={20} width={`65%`} />
                                ) : (
                                    props.release_date && (
                                        <div className='flex gap-3 mt-2 items-center text-blueGray'>
                                            <FontAwesomeIcon
                                                icon={faCalendarDays}
                                            />
                                            <div>
                                                {formatDateString(
                                                    props.release_date
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            {props.isLoading ? (
                                <Skeleton height={40} width={`100%`} />
                            ) : (
                                <button
                                    type='button'
                                    onClick={() => {
                                        props.handleFavoriteButtonClick()
                                        props.isFavorite
                                            ? customToast(
                                                  'emoji',
                                                  'Removed from favorites',
                                                  '💔'
                                              )
                                            : customToast(
                                                  'emoji',
                                                  'Added to favorites',
                                                  '💖'
                                              )
                                    }}
                                    className={`hover:shadow transition-all px-3 font-medium rounded-lg text-xs py-2 mr-2 mt-2 xs:mt-0 xs:mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border ${
                                        props.isFavorite
                                            ? 'text-gray-900 border-gray-200'
                                            : 'text-white bg-green border-green'
                                    }`}>
                                    {props.isFavorite
                                        ? 'Remove favorite'
                                        : 'Favorite'}
                                </button>
                            )}
                        </section>
                    </header>
                    <main className='col-span-3 bg-blue-1000'>
                        <section className='col-span-3 bg-blue-1000'>
                            <nav className='border-b border-gray-200 dark:border-gray-700'>
                                <ul className='flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400'>
                                    {props.isLoading ? (
                                        <ul className='flex gap-3 justify-around'>
                                            <Skeleton height={50} width={100} />
                                            <Skeleton height={50} width={100} />
                                        </ul>
                                    ) : (
                                        tabs.map((tab, index) => (
                                            <button
                                                key={index}
                                                className='mr-2'
                                                onClick={() =>
                                                    setSelectedTab(tab.title)
                                                }>
                                                <div
                                                    className={`inline-flex items-center justify-center p-4 rounded-t-lg cursor-pointer ${
                                                        selectedTab ===
                                                        tab.title
                                                            ? 'text-green border-b-2 border-green active dark:text-green dark:border-green'
                                                            : ''
                                                    }`}
                                                    aria-current='page'>
                                                    <FontAwesomeIcon
                                                        className={`w-4 h-4 mr-2 ${
                                                            selectedTab ===
                                                            tab.title
                                                                ? 'text-green dark:text-green'
                                                                : 'text-gray-400 dark:text-gray-500'
                                                        }`}
                                                        icon={tab.icon}
                                                    />
                                                    {tab.title}
                                                </div>
                                            </button>
                                        ))
                                    )}
                                </ul>
                            </nav>
                            <article className='flex flex-col gap-8 py-8 xs:px-8'>
                                {selectedTab === 'Lyrics' && props.lyrics && (
                                    <p className='text-blueGray whitespace-pre-line'>
                                        {props.isLoading ? (
                                            <>
                                                <Skeleton
                                                    count={5}
                                                    width={'100%'}
                                                />
                                                <br />
                                                <Skeleton
                                                    count={4}
                                                    width={'100%'}
                                                />
                                                <br />
                                                <Skeleton
                                                    count={6}
                                                    width={'100%'}
                                                />
                                            </>
                                        ) : (
                                            props.lyrics
                                        )}
                                    </p>
                                )}
                                {selectedTab === 'Info' && (
                                    <>
                                        {props.description?.map(
                                            (
                                                paragraph: string,
                                                index: number
                                            ) => (
                                                <p
                                                    key={index}
                                                    className='text-blueGray'>
                                                    {paragraph}
                                                </p>
                                            )
                                        )}
                                    </>
                                )}
                                {selectedTab === 'Reviews' && (
                                    <Reviews
                                        targetId={props.id}
                                        targetType={props.type}
                                    />
                                )}
                            </article>
                        </section>
                    </main>
                </article>
            </section>
        </main>
    )
}
