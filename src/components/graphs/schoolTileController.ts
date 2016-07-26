///<reference path="../../tsd.d.ts"/>

export default class SchoolTileController {
  public graphData: any;
  public tileData: any;
  public graphId = 'work-tile';
  public tileTitle = 'Schools per month';
  public availableGraphs = [
    {icon: 'donut_large', type: 'donut', title: 'Donut chart'},
    {icon: 'pie_chart', type: 'pie', title: 'Pie chart'},
    {icon: 'equalizer', type: 'bar', title: 'Bar chart'}
  ];

  public speedDialItems: any[] = [];
  public speedDialDirection: 'left';
  /* @ngInject */
  constructor(private schoolLoader: any) {
    this.initSpeedDial();
    let jobsData = this.schoolLoader.getJobsData();
    if (jobsData.hasOwnProperty('$$state')) {
      jobsData.then((schoolData) => {
        this.tileData = schoolData;
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
