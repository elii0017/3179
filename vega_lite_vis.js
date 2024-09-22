// Define your Vega-Lite specification
const spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 800,
  "height": 600,
  "title": "Prisoner Population by Australian State/Territory",
  "projection": {"type": "mercator"},
  "data": {
    "url": "https://raw.githubusercontent.com/elii0017/3179/refs/heads/main/STE_2016_AUST.json",
    "format": {"type": "topojson", "feature": "STE_2016_AUST"}
  },
  "transform": [
    {
      "lookup": "properties.STE_NAME16",
      "from": {
        "data": {
          "url": "https://raw.githubusercontent.com/elii0017/3179/refs/heads/main/Average%20daily%20imprisonment%20rate.csv"
        },
        "key": "States",
        "fields": ["Mar Qtr 2023", "Jun Qtr 2023", "Mar Qtr 2024", "Jun Qtr 2024"]
      }
    },
    {
      "fold": ["Mar Qtr 2023", "Jun Qtr 2023", "Mar Qtr 2024", "Jun Qtr 2024"],
      "as": ["Quarter", "ImprisonmentRate"]
    },
    {
      "filter": {"selection": "selected"}
    }
  ],
  "selection": {
    "selected": {
      "type": "single",
      "fields": ["Quarter"],
      "bind": {
        "input": "select",
        "options": ["Mar Qtr 2023", "Jun Qtr 2023", "Mar Qtr 2024", "Jun Qtr 2024"],
        "name": "Select Quarter: "
      },
      "init": {"Quarter": "Mar Qtr 2023"}
    }
  },
  "mark": {"type": "geoshape", "stroke": "white"},
  "encoding": {
    "color": {
      "field": "ImprisonmentRate",
      "type": "quantitative",
      "scale": {
        "type": "threshold",
        "domain": [100, 150, 200, 225, 250, 300, 350, 1000, 1200],
        "scheme": "blues"
      },
      "legend": {"title": "Imprisonment Rate"}
    },
    "tooltip": [
      {"field": "properties.STE_NAME16", "type": "nominal", "title": "States"},
      {"field": "ImprisonmentRate", "type": "quantitative", "title": "Imprisonment Rate"}
    ]
  }
};

// Embed the visualization
vegaEmbed('#choropleth_map', spec)
  .then(result => {
    // Visualization successfully created
  })
  .catch(console.error); // Handle errors
