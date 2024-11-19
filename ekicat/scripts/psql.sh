#!/usr/bin/env sh
set -x
docker compose exec postgres psql postgres://ekicatdev:ekicatdev@localhost/ekicatdev "$@"
