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
let nextSequenceToken = null; // need this for sending log to AWS. Will update after each request.
let eventsQueue = [];
let interval = null;
// use a queue to send log to couldWatch one at a time to avoid throttling
async function startLogQueueToCloudWatch() {
  if (interval == null) {
    interval = setInterval(async () => {
      if (eventsQueue.length == 0) {
        clearInterval(interval);
        interval = null;
        return;
      }
      let event = eventsQueue.shift();
      try {
        console.log(event);
        let res = await cloudWatchPutLogEvents(
          [event],
          "api",
          "prod",
          nextSequenceToken
        );
        nextSequenceToken = res.nextSequenceToken; // store the new sequence token
      } catch (error) {
        // to allow retry
        console.log(error);
      }
    }, 1000);
  }
}
async function log(message) {
  if (nextSequenceToken == null) {
    // just ran server, get the token from AWS
    let res = await cloudWatchDescribeLogStreams("api");
    nextSequenceToken = res.logStreams[0].uploadSequenceToken;
  }
  eventsQueue.push({
    message: message,
    timestamp: new Date().getTime(),
  });
  await startLogQueueToCloudWatch();
}

log("Hi there");
