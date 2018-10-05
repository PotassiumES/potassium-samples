#!/bin/bash

# This tries to copy the relevant files from ../potassium-es/ and ../potassium-components/ into their respective node_modules
# It's handy during development of the core platform

cp -r ../postcss-potassium/*.js node_modules/postcss-potassium/
cp -r ../postcss-potassium/src/*.js node_modules/postcss-potassium/src/

cp -r ../potassium-es/src/* node_modules/potassium-es/src/
cp -r ../potassium-es/styles/* node_modules/potassium-es/styles/
cp -r ../potassium-es/static/* node_modules/potassium-es/static/

cp -r ../potassium-components/src/* node_modules/potassium-components/src/
cp -r ../potassium-components/styles/* node_modules/potassium-components/styles/
cp -r ../potassium-components/static/* node_modules/potassium-components/static/
