import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartItem = ({
  song,
  handlePlay,
  handlePause,
  isPlaying,
  activeSong,
  index,
}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] hover:rounded-xl py-2 p-4 cursor-pointer">
    <h3 className="text-white text-base font-bold mr-3">{index + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        src={song?.images.coverart}
        alt={song?.title}
        className="w-20 h-20 rounded-lg"
      />
      <div className="flex flex-1 flex-col justify-center ml-3">
        <Link to={`/songs/${song.key}`}>
          <p className="font-xl font-bold text-white">{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="font-base text-gray-300 mt-1">{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      song={song}
      play={handlePause}
      pause={handlePlay}
      isPlaying={isPlaying}
      activeSong={activeSong}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const topPlaySongs = data?.slice(0, 5);
  const ref = useRef(null);

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  });

  const handlePlay = (song, index) => {
    dispatch(setActiveSong({ data, song, index }));
    dispatch(playPause(true));
  };

  const handlePause = () => {
    dispatch(playPause(false));
  };

  return (
    <div
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
      ref={ref}
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-base text-gray-300 cursor-pointer">See more</p>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-2">
        {topPlaySongs?.map((song, index) => (
          <TopChartItem
            key={song.key}
            song={song}
            index={index}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePlay={() => handlePlay(song, index)}
            handlePause={handlePause}
          />
        ))}
      </div>
      <div className="w-full flex flex-col mt-2">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-base text-gray-300 cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlaySongs?.map((song) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img
                  src={song?.images.background}
                  alt="Name"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
