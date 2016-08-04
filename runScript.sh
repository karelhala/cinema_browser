#!/usr/bin/env bash
wget "http://www.cinemacity.cz/en/upcommingJSON?includeVenueName=true&days=5&showExpired=true" -O "data/allMovies.json"
wget "http://www.cinemacity.cz/upcommingJSON?includeVenueName=true&days=5&showExpired=true" -O "data/allMoviesCZ.json"

