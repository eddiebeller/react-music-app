import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCoreApi';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    error,
    isFetching: isFetchingArtistDetails,
  } = useGetArtistDetailsQuery(artistId);

  if (isFetchingArtistDetails) {
    return <Loader title="Searching artist details" />;
  }

  if (error) return <Error />;

  return (
    <section className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />
      <RelatedSongs
        artistId={artistId}
        data={Object.values(artistData?.songs)}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </section>
  );
};

export default ArtistDetails;
