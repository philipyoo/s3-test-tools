# s3-test-tools

Utility commands for helping to setup and test in Zenko kubernetes instance

## List of available commands

- **env.sh**: These env variables are used for Zenko e2e backbeat tests.
              Copy over environment variables and source the file
              `$ chmod u+x env.sh`
              `$ . ./env.sh`
- **makeRequest**: Helper command for making requests to Zenko api.
                   Requires setting `env.sh`.
                   `$ npm run get <url path>`
                   `$ npm run post <url path>`



## Things to add

- Steps for installing kafka/zookeeper cli binaries
- Add force remove versioned bucket script
