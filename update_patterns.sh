set -e
git submodule update --init
cd library
git pull --ff-only
