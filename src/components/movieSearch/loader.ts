///<reference path="../../tsd.d.ts"/>
import SearcherComponent from './searcher';
export default (module: ng.IModule) => {
  module.component('ccMovieSearch', new SearcherComponent);
};
