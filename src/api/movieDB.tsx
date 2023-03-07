import axios from 'axios';

//Estamos creando la peticion
const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '9d9ec9ae56ec2f281b9b52afc6f1c31c',
    language: 'es-ES',
  },
});

export default movieDB;
