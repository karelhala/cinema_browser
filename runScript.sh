#!/usr/bin/env bash
for CINEMA_ID in 1010103 1010107
do
    wget "http://www.cinemacity.cz/upcommingJSON?includeVenueName=true&subSiteId=$CINEMA_ID&days=5&showExpired=true" -O "data/$CINEMA_ID.json"
done

