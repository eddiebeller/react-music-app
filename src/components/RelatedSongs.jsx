import SongBar from './SongBar';

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePlay,
  handlePause,
  artistId,
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">Related Songs</h1>
    <div className="mt-6 flex flex-col w-full">
      {data?.map((song, index) => (
        <SongBar
          song={song}
          key={`${song.key}-${artistId}`}
          index={index}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePlay={() => handlePlay(song, index)}
          handlePause={handlePause}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
