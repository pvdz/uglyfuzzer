#!/usr/bin/env bash

while true; do

  echo "########################################";

  CODE=$(node index.js);

  echo "$CODE

  ";
  echo "$CODE" > z.js

  ORG=$(node z.js);
  MIN=$(node_modules/.bin/uglifyjs z.js -c | node);

  echo "
  org: $ORG
  min: $MIN
";

  if [ "$ORG" != "$MIN" ]; then
    exit 1
  fi
done

