export type GeniusMusicPlayerProps = {
    id: string
}

export const GeniusMusicPlayer = (props: GeniusMusicPlayerProps) => {
    return (
        <iframe
            src={'https://genius.com/songs/' + props.id + '/apple_music_player'}
            title='Genius apple music player'
            className='h-56 fixed sm:block hidden bottom-0 w-3/4 left-1/2 transform -translate-x-1/2 max-h'
        />
    )
}
