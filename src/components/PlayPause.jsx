import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ song, play, pause, isPlaying, activeSong }) => (isPlaying && activeSong?.title === song.title ? (
  <FaPauseCircle size={35} className="text-gray-300" onClick={play} />
) : (
  <FaPlayCircle size={35} className="text-gray-300" onClick={pause} />
));

export default PlayPause;
