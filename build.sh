#!/bin/bash
# Run a build and set things up in the gh-pages branch

TMP_DIR=/tmp/hyperion-remote

# run build in master
git checkout master
grunt

# cleanup and copy new build to tmp
rm -rf $TMP_DIR
mkdir $TMP_DIR
cp -r out/browser/* $TMP_DIR

# copy from tmp to gh-pages
git checkout gh-pages
cp -r $TMP_DIR/* .

# cleanup
rm -rf $TMP_DIR