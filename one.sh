#!/usr/bin/env bash

# run z.js in node befor and after mangling with uglify

echo "########################################";

MINCODE=$(node_modules/.bin/uglifyjs z.js -c 2>/dev/null);

ORG=$(node z.js);
echo "$MINCODE" > min.js
MIN=$(node min.js)

echo "
  org: $ORG
  min: $MIN
";

if [ "$ORG" == "$MIN" ]; then
  echo "PASS"
else
  echo "FAIL"
fi

