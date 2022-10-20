import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from '../redux/services/shazamCoreApi';

import { setActiveSong, playPause } from '../redux/features/playerSlice.js';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: songData,
    error,
    isFetching: isFetchingSongDetails,
  } = useGetSongDetailsQuery({ songid });

  const { data, isFetching: isFetchingSongsRelated } = useGetSongRelatedQuery({
    songid,
  });

  const handlePlay = (song, index) => {
    dispatch(setActiveSong({ data, song, index }));
    dispatch(playPause(true));
  };
  const handlePause = () => {
    dispatch(playPause(false));
  };

  if (isFetchingSongDetails || isFetchingSongsRelated) {
    return <Loader title="Searching song details" />;
  }

  if (error) return <Error />;

  return (
    <section className="flex flex-col">
      <DetailsHeader artistId={artistId} songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics</h2>
        <div className="mt-5">
          {songData?.sections[1].type === 'LYRICS' ? (
            songData?.sections[1].text.map((lyrics, index) => (
              <p className="text-gray-400 font-base my-1" key={index}>
                {lyrics}
              </p>
            ))
          ) : (
            <p>No Lyrics found</p>
          )}
        </div>
      </div>
      <RelatedSongs
        artistId={artistId}
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePlay={handlePlay}
        handlePause={handlePause}
      />
    </section>
  );
};

export default SongDetails;
