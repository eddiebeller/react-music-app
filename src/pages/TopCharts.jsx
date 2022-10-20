import { useSelector } from 'react-redux';
import Heading from './Heading';

import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCoreApi';

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) {
    return <Loader title="Loading the top charts..." />;
  }

  if (error) return <Error />;

  return (
    <section className="flex flex-col">
      <Heading title="Top Charts" />
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
