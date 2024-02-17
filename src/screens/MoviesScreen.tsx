import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {useQuery} from 'react-query';
import {getMovies} from '../services/MovieService';

// const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your TMDB API key
// const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const API_URL = 'https://test.create.diagnal.com/data/page1.json';

const MoviesScreen = () => {
  // const [movies, setMovies] = useState([]);
  const {data: movies, isLoading, isError} = useQuery('movies', getMovies);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log('==============>', data.page['content-items']?.content);

      // setMovies(data.page['content-items']?.content);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const renderMovieItem = ({item}) => (
    <Card style={styles.card}>
      <Card.Cover
        // source={{uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`}}
        source={{
          uri: `https://test.create.diagnal.com/images/${item.image}`,
        }}
      />
      <Card.Content>
        <Title>{item.title}</Title>
      </Card.Content>
    </Card>
  );

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Error loading books</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={item => item?.id?.toString()}
        renderItem={renderMovieItem}
        horizontal={false}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    margin: 8,
  },
});

export default MoviesScreen;
