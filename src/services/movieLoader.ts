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
      this.allMovies = allMovies;
      return this.allMovies;
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
      console.log(data);
      this.allMovies = data;
      return data[1];
    });
  }

  private filterCinemaData(data) {

  }
}
