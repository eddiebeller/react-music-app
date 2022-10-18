import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { playPause, setActiveSong } from '../redux/features/playerSlice';
import PlayPause from './PlayPause';

const SongCard = ({ song, activeSong, isPlaying, data, index }) => {
  const dispatch = useDispatch();
  const handlePlay = () => {
    dispatch(setActiveSong({ data, song, index }));
    dispatch(playPause(true));
  };
  const handlePause = () => {
    dispatch(playPause(false));
  };
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title
              ? 'flex bg-black bg-opacity-70'
              : 'hidden'
          }`}
        >
          <PlayPause
            song={song}
            play={handlePause}
            pause={handlePlay}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </div>
        <img src={song.images?.coverart} alt="Song_image" />
      </div>
      <div className="mt-4 flex flex-col">
        <h3 className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song.key}`}>{song.title}</Link>
        </h3>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : '/top-artists'
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
