# Zenko Toolbox

Utility commands for helping to setup and test in Zenko kubernetes deployments

## Setup

This is required for using any commands in the `lib` directory. For convenience,
the same environment variables are used as in the e2e tests.

```
# env vars
# First add environment variables to "env.sh" then source:
$ . ./env.sh
```

## List of available commands

#### lib/makeRequest

Helper command for making requests to Zenko api. Requires setting `env.sh`.

`$ npm run get <url path>`

`$ npm run post <url path>`

#### lib/forceRemove

Helper command for deleting all versions & delete markers in a bucket. Requires setting `env.sh`.

`$ npm run removeVersions <location> <bucket>`

Where `location` argument should be either "aws" or "zenko" and `bucket` should
be the bucket name.

#### bin/kafkaCli.sh

Bash script to easily create a Kafka kubernetes pod called `debug-kafka-cli` to
use the binary Kafka commands offered by default when installing Kafka.

No setup is required. Simply run the command by executing the bash file and
passing the normal Kafka command to it. For example:

$ `./bin/kafkaCli.sh bin/kafka-topics.sh --zookeeper <zenko-quorum-cluster-ip>:2181 --list`

Where the `zenko-quorum-cluster-ip` is the kubernetes cluster ip for Kafka
(named `quorum` in the Zenko environment).

#### bin/zkCli.sh

Bash script to easily enter the Zookeeper cli.

No setup is required. Example:

$ `./bin/zkCli.sh`

## Things to add

- Refactor by using a single cli for running commands
