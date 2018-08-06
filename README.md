# s3-test-tools

Utility commands for helping to setup and test in Zenko kubernetes instance

## Setup

```
# Zookeeper (for cli)
$ wget http://apache.claz.org/zookeeper/stable/zookeeper-3.4.12.tar.gz
$ tar xvf zookeeper-3.4.12.tar.gz

# Kafka (for cli)
$ wget http://apache.claz.org/kafka/2.0.0/kafka_2.11-2.0.0.tgz
$ tar -xzf kafka_2.11-2.0.0.tgz

# env vars
# First add environment variables to "env.sh" then source:
$ . ./env.sh
```

## List of available commands

#### makeRequest

Helper command for making requests to Zenko api. Requires setting `env.sh`.

`$ npm run get <url path>`

`$ npm run post <url path>`

#### forceRemove

Helper command for deleting all versions & delete markers in a bucket

`$ npm run removeVersions <location> <bucket>`

Where `location` argument should be either "aws" or "zenko" and `bucket` should
be the bucket name.


## Things to add

- Refactor by using a single cli for running commands
