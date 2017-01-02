///<reference path="../tsd.d.ts"/>
import * as moment from 'moment';

export default class MovieLoader {
  private cinemaWorker: any;
  public allMovies: any;
  private enMoviesUrl = 'http://www.cinemacity.cz/en/upcommingJSON?includeVenueName=true&days=5&showExpired=true';
  private czMoviesUrl = 'http://www.cinemacity.cz/upcommingJSON?includeVenueName=true&days=5&showExpired=true';
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
    const enMovies = this.fetchMovies(this.enMoviesUrl);
    const czMovies = this.fetchMovies(this.czMoviesUrl);
    return this.$q.all([enMovies, czMovies]).then((data) => {
      this.allMovies = data;
      return data[1];
    });
  }

  private fetchMovies(moviesUrl) {
    let query = `select * from json where url="${moviesUrl}"`;
    let url = `https://query.yahooapis.com/v1/public/yql?q=${encodeURIComponent(query)}&format=json&callback=JSON_CALLBACK`;
    return this.$http.jsonp(url).then(responseData => responseData.data.query.results.json);
  }

  public filterMoviesAndSites(allCinemas) {
    return this.cinemaWorker.run({cinemas: allCinemas, movies: this.allMovies[1]});
  }

  public filterCinemaData(data: any) {
    // importScripts('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.js');
    _.each(data.cinemas, (oneCinema: any) => {
      let cinemasMovies: any = _.filter(data.movies.sites, {si: oneCinema.value+""})[0];
      cinemasMovies.filtered = _.groupBy(cinemasMovies.pr, (item: any) => item.dt.substr(0, item.dt.indexOf(' ')));
      _.each(cinemasMovies.filtered, (item, key) => {
        cinemasMovies.filtered[key] = _.groupBy(item, (movie: any) => {return movie.tm.substr(0,2);});
      });
      oneCinema.movies = cinemasMovies;
    });
    return data.cinemas;
  }
}
