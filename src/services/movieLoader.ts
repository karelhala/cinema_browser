///<reference path="../tsd.d.ts"/>
import * as moment from 'moment';

export default class MovieLoader {
  private cinemaWorker: any;
  public allMovies: any;
  private enMoviesUrl = 'http://www.cinemacity.cz/en/upcommingJSON?includeVenueName=true&days=5&showExpired=true';
  private czMoviesUrl = 'http://www.cinemacity.cz/upcommingJSON?includeVenueName=true&days=5&showExpired=true';
  private searchPath = '//*[@id="search-films"]//li';
  private ratingPath = '//*[@id="rating"]//h2';
  private plotPath = '//*[@id="plots"]/div[2]/ul/li[1]/div[1]';

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

  public getMovieInfo(movieName) {
    let query = `select * from html where url='http://www.csfd.cz/hledat/?q=${encodeURI(movieName)}' and xpath='${this.searchPath}'`;
    let url = MovieLoader.yahooUrl(query);
    return this.$http.jsonp(url).then(data => {
      let movieInfo = data.data.query.results.li[0].a;
      let basicInfo = data.data.query.results.li[0].div.p[0];
      const movieRating = this.fetchMovieRating('http://www.csfd.cz' + movieInfo.href + 'prehled');
      const plotInfo = this.fetchMovieInfo('http://www.csfd.cz' + movieInfo.href + 'prehled');
      return this.$q.all([movieRating, plotInfo]).then(dataPayload => {
        return {
          movieRating: dataPayload[0],
          plotInfo: dataPayload[1],
          basicData: basicInfo,
          movieInfo: movieInfo
        };
      });
    });
  }

  private fetchMovieRating(movieUrl) {
    let query = `select * from html where url='${encodeURI(movieUrl)}' and xpath='${this.ratingPath}'`;
    let url = MovieLoader.yahooUrl(query);
    return this.$http.jsonp(url).then(data => data.data.query.results.h2.content);
  }

  private fetchMovieInfo(movieUrl) {
    let query = `select * from html where url='${encodeURI(movieUrl)}' and xpath='${this.plotPath}'`;
    let url = MovieLoader.yahooUrl(query);
    return this.$http.jsonp(url).then(data => data.data.query.results.div);
  }

  private fetchMovies(moviesUrl) {
    let query = `select * from json where url="${moviesUrl}"`;
    let url = MovieLoader.yahooUrl(query);
    return this.$http.jsonp(url).then(responseData => responseData.data.query.results.json);
  }

  private static yahooUrl(q) {
    return `https://query.yahooapis.com/v1/public/yql?q=${encodeURIComponent(q)}&format=json&callback=JSON_CALLBACK`;
  }

  public filterMoviesAndSites(allCinemas) {
    return this.cinemaWorker.run({cinemas: allCinemas, movies: this.allMovies[1]});
  }

  public filterCinemaData(data: any) {
    // importScripts('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.js');
    _.each(data.cinemas, (oneCinema: any) => {
      let cinemasMovies: any = _.filter(data.movies.sites, {si: oneCinema.value + ''})[0];
      cinemasMovies.filtered = _.groupBy(cinemasMovies.pr, (item: any) => item.dt.substr(0, item.dt.indexOf(' ')));
      _.each(cinemasMovies.filtered, (item, key) => {
        cinemasMovies.filtered[key] = _.groupBy(item, (movie: any) => {return movie.tm.substr(0,2);});
      });
      oneCinema.movies = cinemasMovies;
    });
    return data.cinemas;
  }
}
