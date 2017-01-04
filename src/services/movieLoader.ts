///<reference path="../tsd.d.ts"/>
import * as _ from 'lodash';

export default class MovieLoader {
  public allMovies: any;
  private moviePromise;
  private enMoviesUrl = 'http://www.cinemacity.cz/en/upcommingJSON?includeVenueName=true&days=5&showExpired=true';
  private czMoviesUrl = 'http://www.cinemacity.cz/upcommingJSON?includeVenueName=true&days=5&showExpired=true';
  private searchPath = '//*[@id="search-films"]//li';
  private ratingPath = '//*[@id="rating"]//h2';
  private plotPath = '//*[@id="plots"]/div[2]/ul/li[1]/div[1]';

  /* @ngInject */
  constructor(private $http: any, private $q: any) {
  }

  public getMovies() {
    if (!this.moviePromise) {
      this.moviePromise = this.loadMovies().then((allMovies) => {
        return allMovies;
      });
    }
    return this.moviePromise;
  }

  private loadMovies() {
    return this.fetchMovies(this.czMoviesUrl).then(data => {
      this.allMovies = data;
      return data;
    });
  }

  public getMovieInfo(movieName) {
    let query = MovieLoader.yahooQuery(`http://www.csfd.cz/hledat/?q=${movieName}`, this.searchPath);
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
    let query = MovieLoader.yahooQuery(movieUrl, this.ratingPath);
    let url = MovieLoader.yahooUrl(query);
    return this.$http.jsonp(url).then(data => data.data.query.results.h2.content);
  }

  private fetchMovieInfo(movieUrl) {
    let query = MovieLoader.yahooQuery(movieUrl, this.plotPath);
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

  private static yahooQuery(url, xpath) {
    return `select * from html where url='${encodeURI(url)}' and xpath='${xpath}'`;

  }

  public filterCinemaData(data: any) {
    return data.cinemas
      .map(oneCinema => {
        return {movies: MovieLoader.filterMovieSites(data.movies, oneCinema), ...oneCinema};
      });
  }

  private static filterMovieSites(movies, oneCinema): any {
    return _
      .chain(movies.sites)
      .filter(oneSite => oneSite.si === oneCinema.value + '')
      .reduce((result, site: any) => {
        return {filtered: MovieLoader.groupByDateTime(site.pr), ...site};
      }, {}).value();
  }

  private static groupByDateTime(screenings) {
    return _
      .chain(screenings)
      .groupBy((item: any) => item.dt.substr(0, item.dt.indexOf(' '))) //will group by date
      .mapValues(itemValues => _.groupBy(itemValues, ((movie: any) => movie.tm.substr(0,2)))) // will group by time
      .value();
  }
}
