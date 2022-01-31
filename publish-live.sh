#!/bin/bash

current_branch=$(git symbolic-ref --short HEAD)

git branch -D tmp
git branch -D gh-pages
git checkout --orphan tmp &&\
git add -f dist/* &&\
git commit -m "publish" &&\
git subtree split --prefix dist -b gh-pages &&\
git push -f origin gh-pages &&\
git checkout $current_branch
