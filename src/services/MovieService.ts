// src/services/BookService.ts
import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const getBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?q=javascript`);
    return response.data.items.map((item: any) => ({
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors
        ? item.volumeInfo.authors.join(', ')
        : 'Unknown Author',
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const getMovies = async () => {
  try {
    const response = await axios.get(
      `https://test.create.diagnal.com/data/page1.json`,
    );
    return response.data.page['content-items']?.content.map((item: any) => ({
      title: item.name,
      image: item['poster-image'],
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};
