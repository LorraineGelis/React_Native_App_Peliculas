import React from 'react';
//import {useNavigation} from '@react-navigation/core';
import {ActivityIndicator, Dimensions, View, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Carousel from 'react-native-snap-carousel';

import {useMovies} from '../hooks/useMovies';
import {MoviePoster} from '../components/MoviePoster';
import { HorizontalSlider } from '../components/HorizontalSlider';


const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();

  //console.log(peliculasEnCine[1]?.title)

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (

    <ScrollView>
    <View
      style={{
        marginTop: top + 20,
      }}>

       {/*  Carousel principal */}
        <View style={{ height: 440 }}>
      <Carousel
        data={nowPlaying}
        renderItem={({item}: any) => <MoviePoster movie={item} />}
        sliderWidth={windowWidth}
        itemWidth={300}
        inactiveSlideOpacity={0.9}
      />
      </View>

      {/* Peliculas populares */}
     {/*   <HorizontalSlider title="En cine" movies={peliculasEnCine} /> */}
       <HorizontalSlider title="Popular" movies={popular} />
       <HorizontalSlider title="Top Rated" movies={topRated} />
       <HorizontalSlider title="Upcoming" movies={upcoming} />
    </View>
    </ScrollView>
  );
};
