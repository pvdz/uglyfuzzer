# UglyFuzzy

This is a tentative fuzzer for trying to find bugs in [UglifyJS](https://github.com/mishoo/UglifyJS2/). It's also ugly code whipped up quickly. And a fuzzer.

# Running

You can start it by running [run.sh](run.sh), after `npm install` to get [UglifyJS](https://github.com/mishoo/UglifyJS2/).

# How it works

It works by generating random JavaScript. The scripts may reference and manipulate two vars.

The code first runs in node where it logs out the two variables after running the script. Then the code is ran through [UglifyJS](https://github.com/mishoo/UglifyJS2/) and its result ran through node again. The second output is compared to the first output and if they don't match, the script bails.

This is just a setup to be expanded on. The combinator only uses a very limited subset of options right now.

You can tweak the parameters of how many functions to generate and how deep the recursion is allowed to go.

Run the fuzzer through [run.sh](run.sh) until it stops. It won't stop until it finds an output from normal code that is different from uglified code.

Once it finds a bug, start removing functions and keep running [one.sh](one.sh) until you find the function(s) that cause problems. After that it's just about trimming the test case until it stops breaking. Find a minimal test case and [submit a new bug](https://github.com/mishoo/UglifyJS2/issues/new).
