#!/bin/bash

rm -rf ./static/

mkdir -p ./static/potassium-es/
cp -r ./node_modules/potassium-es/static/* ./static/potassium-es/

mkdir -p ./static/potassium-components/
cp -r ./node_modules/potassium-components/static/* ./static/potassium-components/
