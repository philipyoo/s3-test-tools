/*
    Force remove a versioned bucket
*/

const async = require('async');
const { S3 } = require('aws-sdk');

const userLocation = process.env[2].toLowerCase();
const bucket = process.env[3];
if (!userLocation || !bucket){
    console.log('ERROR: Require 2 arguments (location, bucket)');
    process.exit(1);
}

const validLocations = ['aws', 'zenko'];
if (!validLocations.includes(userLocation)) {
    console.log('ERROR: Location can only be "aws" or "zenko"');
    process.exit(1);
}

let accessKeyId;
let secretAccessKey;
let endpoint;
if (userLocation === 'aws') {
    accessKeyId = process.env.AWS_S3_BACKEND_ACCESS_KEY;
    secretAccessKey = process.env.AWS_S3_BACKEND_SECRET_KEY;
    endpoint = 'https://s3.amazonaws.com';
} else {
    accessKeyId = process.env.ZENKO_STORAGE_ACCOUNT_ACCESS_KEY;
    secretAccessKey = process.env.ZENKO_STORAGE_ACCOUNT_SECRET_KEY;
    endpoint = process.env.CLOUDSERVER_ENDPOINT;
}
if (!accessKeyId || !secretAccessKey || !endpoint) {
    console.log('ERROR: An environment variable was not set');
    process.exit(1);
}

const s3 = new S3({
    accessKeyId,
    secretAccessKey,
    sslEnabled: true,
    endpoint,
    apiVersions: { s3: '2006-03-01' },
    signatureCache: false,
    signatureVersion: 'v4',
    region: 'us-east-1',
    s3ForcePathStyle: true,
    maxRetries: 0,
    httpOptions: { timeout: 0 },
});

let shouldContinue;
let kMarker;
let vIdMarker;
async.doUntil(next => {
    const params = { Bucket: bucket };
    if (kMarker || vIdMarker) {
        params[KeyMarker] = kMarker;
        params[VersionIdMarker] = vIdMarker;
    }
    s3.listObjectVersions({ Bucket: bucket }, (err, data) => {
        if (err) {
            console.log('ERROR: failed on listObjectVersions', err);
            shouldContinue = false;
            return next(err);
        }
        if (IsTruncated) {
            kMarker = data.NextKeyMarker;
            vIdMarker = data.NextVersionIdMarker;
            shouldContinue = true;
        } else {
            shouldContinue = false;
        }
        const deleteList = Array.prototype.push.apply(
            data.Versions.map(i => { Key: i.Key, VersionId: i.VersionId }),
            data.DeleteMarkers.map(i => { Key: i.Key, VersionId: i.VersionId })
        );
        return s3.deleteObjects({
            Bucket: bucket,
            Delete: { Objects: deleteList }
        }, (err, res) => {
            if (err) {
                console.log('ERROR: failed on deleteObjects', err);
                shouldContinue = false;
                return next(err);
            }
            return next();
        });
    });
}, () => shouldContinue);
