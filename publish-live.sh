#!/bin/bash

current_branch=$(git symbolic-ref --short HEAD)

git branch -D tmp
git branch -D gh-pages
git checkout --orphan tmp &&\
git add -f dist/* &&\
git commit -m "publish" &&\
git subtree split --prefix dist -b gh-pages &&\
git checkout gh-pages &&\
git branch  &&\
#echo "daard-atlas-staging.csgis.de" > CNAME
echo "daard.dainst.org" > CNAME
git add CNAME
git commit -m "Added CNAME" &&\
git checkout tmp
git push -f origin gh-pages &&\
git checkout $current_branch

