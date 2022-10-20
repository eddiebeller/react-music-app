import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCoreApi';

const AroundYou = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=${
          import.meta.env.VITE_GEO_API_KEY
        }`,
      )
      .then((res) => setCountry(res?.data?.location.country))
      .catch((err) => console.log(err.message))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching && loading) {
    return <Loader title="Loading the songs around you..." />;
  }

  if (error && country) return <Error />;

  return (
    <section className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mb-10 mt-4">
        Around You
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

export default AroundYou;
