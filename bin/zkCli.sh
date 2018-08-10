#!/usr/bin/env bash

podname=$(kubectl get pods | grep zenko-quorum | head -1 | cut -d' ' -f1)

kubectl exec -it $podname -- /opt/zookeeper/bin/zkCli.sh
