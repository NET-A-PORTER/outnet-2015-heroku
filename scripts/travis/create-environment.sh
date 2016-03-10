echo "Creating test environment"

if [ $TRAVIS_PULL_REQUEST != false ]; then
    curl -n -X POST https://api.heroku.com/app-setups \
    -H "Content-Type:application/json" \
    -H "Accept:application/vnd.heroku+json; version=3" \
    -H "Authorization: Bearer $HEROKU_API_TOKEN" \
    -d '{"source_blob": { "url":"https://github.com/jay-a-porter/preston/tarball/master"} }'
fi