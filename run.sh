#!/usr/bin/env bash

while true; do

  echo "########################################";

  CODE=$(node index.js);

  echo "$CODE" > z.js
  MINCODE=$(node_modules/.bin/uglifyjs z.js -c 2>/dev/null);

  echo "
###
$CODE
###
$MINCODE
###
  ";

  ORG=$(node z.js);
  echo "$MINCODE" > min.js
  MIN=$(node min.js)

  echo "
  org: $ORG
  min: $MIN
";

  if [ "$ORG" != "$MIN" ]; then
    exit 1
  fi
done

