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
};
const command = new AssociateKmsKeyCommand(params);
try {
  const data = await client.send(command);
  console.log(data);
  // process data.
} catch (error) {
  // error handling.
} finally {
  // finally.
}
