console.log("IN INDEX FILE : This is a test log");
console.log("This is another line");
import {
  CloudWatchEventsClient,
  ActivateEventSourceCommand,
} from "@aws-sdk/client-cloudwatch-events";

// a client can be shared by different commands.
// const client = new CloudWatchEventsClient({ region: "ap-south-1" });

// const params = {
//   /** input parameters */
// };
// const command = new ActivateEventSourceCommand(params);
