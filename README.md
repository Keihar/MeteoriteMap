# ImpactAtlas (Deck.gl + Google Maps)

utilizes the power of Deck.gl, a WebGL-powered framework for data visualization, and Google Maps to create an interactive map that displays meteorite data. With this tool, users can explore and analyze information on the location, size, and mass of meteorites that have impacted various regions of the globe.

## Run it

```
git clone <this-repo> 

npm install
npm start
```

## About dataset
Data on over 45k meteorites that have struck Earth from this [dataset](https://www.kaggle.com/datasets/nasa/meteorite-landings).

The Meteoritical Society collects data on meteorites that have fallen to Earth from outer space. This dataset includes the location, mass, and fall year for over 45,000 meteorites that have struck our planet.

Notes on missing or incorrect data points:

- A few entries here contain date information that was incorrectly parsed into the NASA database. As a spot check: any date that is before 860 CE or after 2016 are incorrect; these should actually be BCE years. There may be other errors and we are looking for a way to identify them.
- A few entries have latitude and longitude of 0N/0E (off the western coast of Africa, where it would be quite difficult to recover meteorites). Many of these were actually discovered in Antarctica, but exact coordinates were not given. 0N/0E locations should probably be treated as NA.
