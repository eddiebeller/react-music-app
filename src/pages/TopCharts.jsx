import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) {
    return <Loader title="Loading the top charts..." />;
  }

  if (error) return <Error />;

  return (
    <section className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mb-10 mt-4">
        Top Charts
      </h2>
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

export default TopCharts;
