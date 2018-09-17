#!/bin/bash

rm -rf ./dist/
mkdir -p ./dist/
cp -r ./static ./dist/
cp index.html favicon.ico site.css site.js ./dist/
cp -r ./lib ./dist/
cp -r ./hello-world ./dist/
cp -r ./single-page-app ./dist/
