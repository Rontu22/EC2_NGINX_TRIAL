console.log("IN INDEX FILE : This is a test log");
console.log("This is another line");

import {
  CloudWatchLogsClient,
  AssociateKmsKeyCommand,
} from "@aws-sdk/client-cloudwatch-logs";
const client = new CloudWatchLogsClient({ region: "ap-south-1" });
