import AWS from "aws-sdk";
// import { cloudWatchPutLogEvents, cloudWatchDescribeLogStreams } from "./aws";

AWS.config.region = "ap-south-1";
async function getSSMParameterByName(name) {
  let ssm = new AWS.SSM();
  return new Promise((resolve, reject) => {
    ssm.getParameter({ Name: name }, function (err, data) {
      if (err) reject(err);
      resolve(data.Parameter.Value);
    });
  });
}
// exports.getSSMParameterByName = getSSMParameterByName;
function cloudWatchPutLogEvents(events, group, stream, sequenceToken) {
  return new Promise((resolve, reject) => {
    const cloudwatchlogs = new AWS.CloudWatchLogs();
    var params = {
      logEvents: events,
      logGroupName: group,
      logStreamName: stream,
      sequenceToken: sequenceToken,
    };
    cloudwatchlogs.putLogEvents(params, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}
// exports.cloudWatchPutLogEvents = cloudWatchPutLogEvents;
function cloudWatchDescribeLogStreams(group) {
  return new Promise((resolve, reject) => {
    const cloudwatchlogs = new AWS.CloudWatchLogs();
    var params = {
      logGroupName: group,
    };
    cloudwatchlogs.describeLogStreams(params, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}
// exports.cloudWatchDescribeLogStreams = cloudWatchDescribeLogStreams;
