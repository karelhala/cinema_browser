///<reference path="../../tsd.d.ts"/>
import TableView from './tableView';
import TableRecord from './tableRecord';
export default (module: ng.IModule) => {
  module.component('ccTable', new TableView);
  module.component('ccTableRecord', new TableRecord);
};
