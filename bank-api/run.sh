#!/bin/sh
exec java -jar bank-api-0.0.1-SNAPSHOT.jar --server.port=${PORT:-8080}
