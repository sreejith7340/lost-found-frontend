#!/usr/bin/env bash
# Build frontend and copy into backend public folder
FRONTEND_PATH="../lost-found-frontend"
BACKEND_PUBLIC="./public"
set -e

echo "Building frontend at $FRONTEND_PATH"
pushd "$FRONTEND_PATH"
npm ci
npm run build
popd

echo "Copying build to backend public folder"
rm -rf "$BACKEND_PUBLIC"/*
cp -R "$FRONTEND_PATH/build/"* "$BACKEND_PUBLIC/"
echo "Done."