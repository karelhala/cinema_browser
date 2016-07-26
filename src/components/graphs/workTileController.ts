///<reference path="../../tsd.d.ts"/>

export default class WorkTileController {
  public graphData: any;
  public tileData: any;
  public graphId = 'work-tile';
  public tileTitle = 'Jobs per month';
  public availableGraphs = [
    {icon: 'donut_large', type: 'donut', title: 'Donut chart'},
    {icon: 'pie_chart', type: 'pie', title: 'Pie chart'},
    {icon: 'equalizer', type: 'bar', title: 'Bar chart'}
  ];

  public speedDialItems: any[] = [];
  public speedDialDirection: 'left';
  /* @ngInject */
  constructor(private jobsLoader: any) {
    this.initSpeedDial();
    let jobsData = this.jobsLoader.getJobsData();
    if (jobsData.hasOwnProperty('$$state')) {
      jobsData.then((workData) => {
        this.tileData = workData;
        this.tileData.graphData.type = this.availableGraphs[0].type;
      });
    }
  }

  private initSpeedDial() {
    angular.forEach(this.availableGraphs, (oneGraph) => {
      this.speedDialItems.push({
        tooltip: oneGraph.title,
        tooltipDirection: 'top',
        icon: oneGraph.icon,
        type: oneGraph.type
      });
    });
  }

  public onSpeedDialClick(item) {
    this.tileData.graphData.type = item.type;
  }
}
