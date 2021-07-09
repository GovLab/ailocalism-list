////////////////////////////////////////
// reload page after Forward and back
///////////////////////////////////////

const TYPE_BACK_FORWARD = 2;

function isReloadedPage() {
  return performance.navigation.type === TYPE_BACK_FORWARD;
}

function main() {
  if (isReloadedPage()) {
    window.location.reload();
  }
}
main();

////////////////////////////////////////////////////////////
///// TEAM  API REQUEST ` `
////////////////////////////////////////////////////////////


Vue.use(VueMeta);

new Vue({
    
  el: '#home-page',
    
  data () {
  
    return {
      topicData: [],
      aboutData: [],
      TeamData: [],
      projectData: [],
      filterData: [],
      na_count: 0,
      sa_count: 0,
      af_count: 0,
      js_type: [
        { code: '', name: 'All' },
        { code: 'governance-ai', name: 'Innovation in Governance of AI' },
        { code: 'governance', name: 'Innovation in Government' },
        { code: 'tech', name: 'Innovation in Technology' },
        { code: 'covid', name: 'COVID-19' },
      ],
      js_mechanism: [
        { code: '', name: 'All' },
        { code: 'process', name: 'Processes' },
        { code: 'procurement', name: 'Procurement' },
        { code: 'policies', name: 'Policies' },
        { code: 'principles', name: 'Principles' },
      ],
      js_focus: [
        { code: '', name: 'All' },
        { code: 'accountability', name: 'Accountability' },
        { code: 'responsibility', name: 'Responsibility' },
        { code: 'participation', name: 'Participation and Engagement' },
        { code: 'transparency', name: 'Transparency' },
        { code: 'explainability', name: 'Explainability' },
        { code: 'consent', name: 'Consent' },
        { code: 'privacy', name: 'Privacy' },
        { code: 'standardization', name: 'Standardization' },
        { code: 'aiethics', name: 'AI Ethics' },
        { code: 'procure', name: 'Procurement' },
      ],

      js_region: [
        { code: '', name: 'All' },
        { code: 'eap', name: 'East Asia and Pacific' },
        { code: 'eu', name: 'Europe and Central Asia' },
        { code: 'lac', name: 'Latin America and the Caribbean' },
        { code: 'mena', name: 'Middle East and North Africa' },
        { code: 'na', name: 'North America' },
        { code: 'ssa', name: 'Sub-Saharan Africa' },
        { code: 'sa', name: 'South Asia' },
        { code: 'cct', name: 'Global' },
      ],

      apiURL: 'https://directus.thegovlab.com/ai-localism',
    }
  },

  created: function created() {
    this.fetchMapExperts();
  },
  methods: {
    fetchMapExperts(){
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "ai-localism",
        storage: window.localStorage
      });

      client.getItems(
        'projects',
        {
          fields: ['*.*']
        }
      ).then(data => {
        console.log(data)
        self.projectData = data.data;
        self.filterData = self.projectData;
        this.updateNumbers(self.filterData);
      })
        .catch(error => console.error(error));
    },
    searchItems() {
      
      squery = document.getElementById('search-text').value;
      let searchData = self.projectData.filter(items => (items.title.toLowerCase().includes(squery.toLowerCase()) || items.description.toLowerCase().includes(squery.toLowerCase())));
      self.filterData = searchData;
      this.updateNumbers(self.filterData);
    },
    ResetItems() {
      self.filterData = self.projectData;
      this.updateNumbers(self.filterData);
      
      document.getElementById('search-text').value = " ";
      document.getElementById("form-1").selectedIndex = 0;
      document.getElementById("form-2").selectedIndex = 0;
      document.getElementById("form-3").selectedIndex = 0;
      document.getElementById("form-4").selectedIndex = 0;
    },    
    changeFilter(event) {
      
      // document.getElementById("filter-count").style.display = "block";
      var element = document.body.querySelectorAll("select");
      this.selectedRegion = element[0].value;
      this.selectedType = element[1].value;
      this.selectedMechanism = element[2].value;
      this.selectedFocus = element[3].value;
      console.log(self.selectedRegion);
      console.log(self.filterData);
      if (this.selectedType == '')
      self.filtered_type = self.projectData;
        
      else {
        let filtered_by_type = self.projectData.filter(function (e) {
          return e.type.some(type_element => type_element == self.selectedType);
        });
        console.log(self.filtered_by_type);
        self.filtered_type = filtered_by_type;
      }

      //Scope Filter
      if (this.selectedRegion == '')
      self.filtered_region = self.filtered_type;
      else {
        let filtered_by_region = self.filtered_type.filter(function (e) {
          return e.region.some(reg_element => reg_element == self.selectedRegion);
        });
        self.filtered_region = filtered_by_region ;
      }
        //Scope Filter
      if (this.selectedFocus== '')
      self.filtered_focus= self.filtered_region;
      else {
        let filtered_by_focus = self.filtered_region.filter(function (e) {
          return e.focus.some(foc_element => foc_element == self.selectedFocus);
        });
        self.filtered_focus = filtered_by_focus;
      }
      //Scope Filter
      if (this.selectedMechanism == '')
      self.filtered_mechanism = self.filtered_focus;
      else {
        let filtered_by_mechanism = self.filtered_mechanism.filter(function (e) {
          return e.mechanism.some(mec_element => mec_element == self.selectedMechanism);
        });
        self.filtered_mechanism = filtered_by_mechanism;
      }
      self.filterData = self.filtered_mechanism;
      console.log(self.filterData);
      this.updateNumbers(self.filterData);
    },
    updateNumbers(filterData){

      self=this;
      self.naData = filterData.filter(items => items.region == "na");
      self.na_count = self.naData.length;
      self.menaData = filterData.filter(items => items.region == "mena");
      self.mena_count = self.menaData.length;
      self.lacData = filterData.filter(items => items.region == "lac");
      self.lac_count = self.lacData.length;
      self.afrData = filterData.filter(items => items.region == "afr");
      self.afr_count = self.afrData.length;
      self.euData = filterData.filter(items => items.region == "eu");
      self.eu_count = self.euData.length;
      self.eapData = filterData.filter(items => items.region == "eap");
      self.eap_count = self.eapData.length;
      self.saData = filterData.filter(items => items.region == "sa");
      self.sa_count = self.saData.length;
      self.ssaData = filterData.filter(items => items.region == "ssa");
      self.ssa_count = self.ssaData.length;
      self.cctData = filterData.filter(items => items.region == "cct");
      self.cct_count = self.cctData.length;
      this.fetchMap(self.na_count,self.mena_count,self.lac_count,self.afr_count,self.eu_count,self.eap_count,self.sa_count,self.ssa_count,self.cct_count);
    },
    fetchMap(na_count,mena_count,lac_count,afr_count,eu_count,eap_count,sa_count,ssa_count,cct_count) {
      self = this;
      self.na_count = na_count;
      self.mena_count = mena_count;
      self.lac_count = lac_count;
      self.afr_count= afr_count;
      self.eu_count = eu_count;
      self.eap_count = eap_count;
      self.sa_count = sa_count;
      self.ssa_count = ssa_count;
      self.cct_count = cct_count;

  /**
 * ---------------------------------------

 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end
  
      // Create map instance
      var chart = am4core.create("chartdiv", am4maps.MapChart);
      chart.geodata = am4geodata_continentsLow;
      chart.projection = new am4maps.projections.Miller();

      // Colors
      var color1 = chart.colors.getIndex(0);

      chart.homeGeoPoint = {
        latitude: 50,
        longitude: 0
      }
      chart.homeZoomLevel = 0.75;
      chart.minZoomLevel = 0.75;
      chart.maxZoomLevel = 0.75;
      chart.seriesContainer.draggable = false;
      chart.seriesContainer.resizable = false;
      chart.chartContainer.wheelable = false;
    
      // Create map polygon series
      var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.exclude = ["antarctica"];
      polygonSeries.useGeodata = true;

      // Configure series
      var polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.fill = am4core.color("#ffffff80");
      polygonTemplate.stroke = am4core.color("#344055");


      // Pins
      var imageSeries = chart.series.push(new am4maps.MapImageSeries());
      var imageTemplate = imageSeries.mapImages.template;
      imageTemplate.propertyFields.longitude = "longitude";
      imageTemplate.propertyFields.latitude = "latitude";
      imageTemplate.nonScaling = true;

      // Creating a pin bullet
      var pin = imageTemplate.createChild(am4plugins_bullets.PinBullet);

      // Configuring pin appearance
      pin.background.fill = am4core.color("#266dd3");
      pin.background.pointerBaseWidth = 1;
      pin.background.pointerLength = 250;
      pin.background.propertyFields.pointerLength = "length";
      pin.circle.fill = am4core.color("#266dd3");
      pin.label = new am4core.Label();
      pin.label.text = "{value}";
      pin.label.fill = am4core.color("#ffffff");

      var label = pin.createChild(am4core.Label);
      // label.text = "{title}";
      label.fontWeight = "bold";
      label.propertyFields.dy = "length";
      label.verticalCenter = "middle";
      label.fill = color1;
      label.adapter.add("dy", function (dy) {
        return (20 + dy) * -1;
      });

      // Creating a "heat rule" to modify "radius" of the bullet based
      // on value in data

      imageSeries.heatRules.push({
        "target": pin.background,
        "property": "radius",
        "min": 20,
        "max": 30,
        "dataField": "value"
      });

      imageSeries.heatRules.push({
        "target": label,
        "property": "dx",
        "min": 30,
        "max": 40,
        "dataField": "value"
      });

      imageSeries.heatRules.push({
        "target": label,
        "property": "paddingBottom",
        "min": 0,
        "max": 10,
        "dataField": "value"
      });
      // Pin data
      imageSeries.data = [{
        "latitude": 40,
        "longitude": -101,
        "value": self.na_count ,
        "title": "North\nAmerica",
        "length": 150
      }, {
        "latitude": 35,
        "longitude": 25,
        "value": self.mena_count,
        "title": "Middle East and North Africa",
        "length": 30
      }, {
        "latitude": 53,
        "longitude": 35,
        "value": self.eu_count,
        "title": "Europe and Central Asia",
        "length": 60
      }, {
        "latitude": -20,
        "longitude": -60,
        "value": self.lac_count,
        "title": "Latin America and the Caribbean",
        "length": 100
      }, {
        "latitude": 10,
        "longitude": 140,
        "value": self.eap_count,
        "title": "East Asia and Pacific",
        "length": 100
      }, 
      {
        "latitude": -20,
        "longitude": 25,
        "value": self.ssa_count,
        "title": "Sub-Saharan Africa",
        "length": 30
      }, 
      {
        "latitude": 20,
        "longitude": 75,
        "value": self.sa_count,
        "title": "South Asia",
        "length": 80
      }];
    }
}
});

