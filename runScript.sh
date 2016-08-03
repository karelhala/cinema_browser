#!/usr/bin/env bash
for CINEMA_ID in 1010103 1010107
do
    for DAY in 0 1 2 3 4 5
    do
        FETCH_DATE=`date -d "+$DAY days" +%d/%m/%Y`
        TIMESTAMP=`date -d ${FETCH_DATE} +"%s"`
        wget "http://www.cinemacity.cz/scheduleInfo?locationId=$CINEMA_ID&date=$FETCH_DATE&hideSite=1" -O "htmlData/$CINEMA_ID/$TIMESTAMP.html"s
    done
done

