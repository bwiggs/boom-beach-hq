# BoomBeach HQ

Plan and Analyze your Boom Beach Forces with BBHq

## Overview

This is in a very alpha stage. Currently working through creating a sqlite database to sore all building and building upgrade information. 

## Development

Clone down the repo and do an `npm install` to get the required deps.

You can query against the sqlite database like so:

	$ sqlite3 -column -header bbhq.db 'select * from upgrades where required_hq between 7 and 11 order by exp_per_hour desc limit 30'
