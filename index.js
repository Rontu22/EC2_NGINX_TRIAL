console.log("IN INDEX FILE : This is a test log");
console.log("This is another line");

import {
  CloudWatchLogsClient,
  AssociateKmsKeyCommand,
} from "@aws-sdk/client-cloudwatch-logs";

// a client can be shared by different commands.
const client = new CloudWatchLogsClient({ region: "ap-south-1" });

const params = {
  logGroupName: "my-log-group",
  kmsKeyId:
    "arn:aws:kms:ap-south-1:307208830146:key/d28c7717-a0a7-4036-8464-4805d88a7ff8",
};
const command = new AssociateKmsKeyCommand(params);
try {
  const data = await client.send(command);
  console.log(data);
  // process data.
} catch (error) {
  // error handling.
  console.log("Error occured");
} finally {
  // finally.
  console.log("This is finally");
}
