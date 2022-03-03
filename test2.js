console.log("IN INDEX FILE : This is a test log");
console.log("This is another line");

import {
  CloudWatchLogsClient,
  DescribeLogStreamsCommand,
  AssociateKmsKeyCommand,
} from "@aws-sdk/client-cloudwatch-logs";
const client = new CloudWatchLogsClient({ region: "ap-south-1" });

const logGroupName = "/var/awslogs/cloudwatch";
const logStreamRes = await awsCloudWatchClient.send(
  new DescribeLogStreamsCommand({
    descending: true,
    logGroupName,
    orderBy: "LastEventTime",
    limit: 50,
  })
);
