///<reference path="../../tsd.d.ts"/>
import BasicGraphDirective from './basicGraphDirective';
import GraphTileComponent from './graphTileComponent';
import WorkTileController from './workTileController';
import SchoolTileController from './schoolTileController';

export default (module: ng.IModule) => {
  module.directive('basicGraph', BasicGraphDirective.Factory());
  module.component('workTile', new GraphTileComponent(WorkTileController));
  module.component('schoolTile', new GraphTileComponent(SchoolTileController));
}
