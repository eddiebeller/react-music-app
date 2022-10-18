import { Error, Loader, ArtistCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) {
    return <Loader title="Loading the top artists..." />;
  }

  if (error) return <Error />;

  // TODO: move Heading to separated component

  return (
    <section className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mb-10 mt-4">
        Top Artists
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((track) => (
          <ArtistCard data={data} key={track.key} track={track} />
        ))}
      </div>
    </section>
  );
};

export default TopArtists;
