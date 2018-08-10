#!/usr/bin/env bash

## To Use: ##
# Just pass the kafka binary cmd directly to this wrapper script

## Example: ##
# $ ./bin/kafkaCli.sh bin/kafka-topics.sh --zookeeper <zenko-quorum-cluster-ip>:2181 --list

if ! $(kubectl get pods | grep -q debug-kafka-cli); then
    echo "creating pod 'debug-kafka-cli'"
    kubectl create -f charts/kafkaclient.yml
fi

kubectl exec -it debug-kafka-cli -- ./$@
