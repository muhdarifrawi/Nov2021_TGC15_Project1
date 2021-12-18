# Weather Forecasting and Historical Data Search Website

## Preface
This webpage was created for users to be able to look at the predicted forecasts in Singapore. Additionally, there was an initial intention of creating an awareness in weather changes. Do take note that it was created for casual usage and not for professionally logging of weather data. 

The website was created with ease of access in mind. A simple navigation bar to show the different pages of the site. Cards to display weather forecast, icons to show current weather location and graphs of different colors.

This webpage is intended to be Open Source and is open for any developers to take inspiration from it or add-on to it. 

The initial idea was to create a forecasting global map with its relevant historical data. After much research for the relevant datasets, that was deemed an Icarus-level goal due to the timeline set for this project. 

## Prerequisites to build this site
Here are the programming langugages, frameworks and softwares used:
- HTML/CSS
- [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
- JavaScript
- [Axios](https://github.com/axios/axios)
- [Leaflet js](https://leafletjs.com/)
- [Apexcharts.js](https://apexcharts.com/)
- [Live SASS compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass) (on Visual Studio Code)

## Datasets used
The weather map plots were datasets derived from data.gov.sg site:
- [Singapore 2-hour Weather Forecast](https://data.gov.sg/dataset/weather-forecast?resource_id=571ef5fb-ed31-48b2-85c9-61677de42ca9)
- [Singapore 24-hour Weather Forecast](https://data.gov.sg/dataset/weather-forecast?resource_id=9a8bd97e-0e38-46b7-bc39-9a2cb4a53a62)
- [Singapore 4-day Weather Forecast](https://data.gov.sg/dataset/weather-forecast?resource_id=4df6d890-f23e-47f0-add1-fd6d580447d1)

The chart plots were datasets derived from data.gov.sg site:
- [Singapore Historical Daily Weather Records](https://data.gov.sg/dataset/historical-daily-weather) 

## Webpage concept
### The Strategy
It was set early-on that the objective of creating the webpage was more of creating awareness. Creating awareness in the changes of weather overtime since the start of weather data collection. Though the methodology was to be more subtle about it and not a direct lecture about it.

It would be detrimental to creating awareness if it was competing with other sites. This site should inspire others to look for more areas where they can learn more on the changes in the weather. Additionally, it was also decided in this portion that people can contribute to the data, fact, findings or any other helpful materials into this website. Hence, it was forecasted that this website would change with accordance to new contributions. 

Research was done to see what datasets were available for public use. The intial scope of data was set to finding global historical datasets. That proved difficult to use and the ones that were found may take time to implement. Therefore, the focus was changed to use local datasets (Singapore).

The found and unused datasets can be found in the ['Found Dataset Source' section]('#found-dataset-source') if anyone is interested. 

### The Scope
*Functional Requirements*

The functional requirements needed are:
- Navigation bar 
- Main page is a map that displays weather.
- A secondary page that shows weather trend chart.
    - Secondary page should also have a simple search function
        to show the different month and year trend.
- Links embedded in the forecast views to lead users to 
    the secondary page that has the weather trends chart.

*Content Requirements*

The content requirements needed are:
- Singapore forecast data.
- Singapore historical data.
- A short info about the app.

### The Structure
*Website navigation*

The webpage is structured in a very linear manner. Navigation bar would lead the user to where they wish to. Also, the forecast portion of the page would have links strategically placed to lead users to the historical data page. The webpage itself can be said to be static with the exception of APIs running in the background. 

*Possibility of data not found*

In the event that the data was unable to load, there should be an alert banner to inform users that the webpage was unable to load instead of a blank screen.

### The Skeleton
The webpage was aimed to look as simple as possible without sacrificing user experience (UX) and user interactivity (UI).

*The Webpage layout*
Pages would consist of the main page, a second page to show graph chart and a last page for an 'About Us' section. 

Every page would have a navigation bar that would lead to each page. It would also have a selection for type of forecast.

![page 1 layout](readme-images\page1.JPG)
![page 2 layout](readme-images\page2.JPG)
![page 3 layout](readme-images\page3.JPG)

*Color Choice*

The base color of the webpage was decided to be warm toned and pastel like. The end choice was to have a variation of the color orange as a base, a darker variation for the navigation bar and a lighter one for the weather cards. The charts were later on changed from the default colors to stand-out better from the base color.




## Found Dataset Source
- [Singapore 2-hour Weather Forecast](https://data.gov.sg/dataset/weather-forecast?resource_id=571ef5fb-ed31-48b2-85c9-61677de42ca9)
- [Singapore 24-hour Weather Forecast](https://data.gov.sg/dataset/weather-forecast?resource_id=9a8bd97e-0e38-46b7-bc39-9a2cb4a53a62)
- [Singapore 4-day Weather Forecast](https://data.gov.sg/dataset/weather-forecast?resource_id=4df6d890-f23e-47f0-add1-fd6d580447d1)
- [Singapore Historical Daily Weather Records](https://data.gov.sg/dataset/historical-daily-weather)
- [ECMWF Meteorological Data](https://apps.ecmwf.int/datasets/)
- [Singapore Meteorological Data]()

- [Copernicus](https://cds.climate.copernicus.eu/api-how-to)

## Other References
- [Getting SEA Meteor History](https://www.researchgate.net/post/Where-can-I-get-a-meteorological-data-for-Southeast-Asia-countries-like-Malaysia-Thailand-or-Indonesia-consist-of-humidity-pressure-temp-etc)
- [Understanding ISO Time](https://www.progress.com/blogs/understanding-iso-8601-date-and-time-format)

