import { Link, useNavigate } from 'react-router-dom';

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  return (
    <figure className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <Link to={`/artists/${track?.artists[0]?.adamid}`}>
        <img
          className="w-full h-56 rounded-lg"
          src={track?.images?.coverart}
          alt="artist"
        />
        <p className="text-white mt-4 font-semibold text-lg truncate">
          {track?.subtitle}
        </p>
      </Link>
    </figure>
  );
};

export default ArtistCard;
