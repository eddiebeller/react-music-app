import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCoreApi';

const Search = () => {
  const { searchInput } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchInput);

  const searchResult = data?.tracks?.hits.map((song) => song.track);

  if (isFetching) {
    return <Loader title="Loading the search results..." />;
  }

  if (error) return <Error />;

  return (
    <section className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mb-10 mt-4">
        Search result for{' '}
        <span className="font-bold italic">{searchInput}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {searchResult?.map((song, index) => (
          <SongCard
            data={data}
            key={song.key}
            song={song}
            index={index}
            activeSong={activeSong}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </section>
  );
};

export default Search;
