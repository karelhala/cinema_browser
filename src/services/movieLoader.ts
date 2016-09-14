///<reference path="../tsd.d.ts"/>
import * as moment from 'moment';

export default class MovieLoader {
  private cinemaWorker: any;
  private allMovies: any;
  /* @ngInject */
  constructor(private Webworker: any, private $http: any, private $q: any) {
    this.cinemaWorker = Webworker.create(this.filterCinemaData);
  }

  public getMovies() {
    return this.loadMovies().then((allMovies) => {
      return allMovies;
    });
  }

  //Use this api to load movie info: http://www.omdbapi.com/t=en_text

  private loadMovies() {
    const enMovies = this.$http.get('data/allMovies.json').then((responseData) => {
      return responseData.data;
    });

    const czMovies = this.$http.get('data/allMoviesCZ.json').then((responseData) => {
      return responseData.data;
    });

    return this.$q.all([enMovies, czMovies]).then((data) => {
      this.allMovies = data;
      return data[1];
    });
  }

  public filterMoviesAndSites(allCinemas) {
    return this.cinemaWorker.run({cinemas: allCinemas, movies: this.allMovies[1]});
  }

  private filterCinemaData(data: any) {
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.js');
    _.each(data.cinemas, (oneCinema: any) => {
      let cinemasMovies: any = _.filter(data.movies.sites, {si: oneCinema.value})[0];
      cinemasMovies.filtered = _.groupBy(cinemasMovies.pr, (item: any) => item.dt.substr(0, item.dt.indexOf(' ')));
      _.each(cinemasMovies.filtered, (item, key) => {
        cinemasMovies.filtered[key] = _.groupBy(item, (movie: any) => {return movie.tm.substr(0,2);});
      });
      oneCinema.movies = cinemasMovies;
    });
    return data.cinemas;
  }
}
