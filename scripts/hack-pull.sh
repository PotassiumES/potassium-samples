#!/bin/bash

# This tries to copy the relevant files from ../potassium-es/ and ../potassium-components/ into their respective node_modules
# It's handy during development of the core platform

cp -r ../potassium-es/src/* node_modules/potassium-es/src/
cp -r ../potassium-es/static/* node_modules/potassium-es/static/

cp -r ../potassium-components/src/* node_modules/potassium-components/src/
cp -r ../potassium-components/static/* node_modules/potassium-components/static/
