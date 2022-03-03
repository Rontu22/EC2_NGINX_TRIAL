import AWS from "aws-sdk";

var cloudwatchlogs = new AWS.CloudWatchLogs({ apiVersion: "2014-03-28" });

var params = {
  kmsKeyId:
    "arn:aws:kms:ap-south-1:307208830146:key/d28c7717-a0a7-4036-8464-4805d88a7ff8" /* required */,
  logGroupName: "/var/aws/group1" /* required */,
};
cloudwatchlogs.associateKmsKey(params, function (err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
});
