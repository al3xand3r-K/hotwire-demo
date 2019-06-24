#!/bin/bash

# pull all browser images listed in 'browsers.json'
cat browsers.json | jq -r '..|.image?|strings' | xargs -I{} docker pull {}

# pulls & runs selenoid in docker container
docker run -d                                   \
--name selenoid                                 \
-p 4444:4444                                    \
-v /var/run/docker.sock:/var/run/docker.sock    \
-v `pwd`/:/etc/selenoid/:ro                     \
aerokube/selenoid:latest-release
