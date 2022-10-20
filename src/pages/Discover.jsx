import { useDispatch, useSelector } from 'react-redux';
import { genres } from '../assets/constants';

import { Error, Loader, SongCard } from '../components';
import { useGetGenreChartsQuery } from '../redux/services/shazamCoreApi';
import { selectGenreListId } from '../redux/features/playerSlice';

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player,
  );
  const { data, isFetching, error } = useGetGenreChartsQuery(
    genreListId || 'POP',
  );

  if (isFetching) return <Loader title="Loading the songs..." />;

  if (error) return <Error />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <section className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white">Discover {genreTitle}</h2>
        <select
          onChange={(event) => {
            dispatch(selectGenreListId(event.target.value));
          }}
          value={genreListId || 'rock'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option value={genre.value} key={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, index) => (
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

export default Discover;
