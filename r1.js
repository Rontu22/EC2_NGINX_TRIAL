import * as AWS from "@aws-sdk/client-cloudwatch-events";
const client = new AWS.CloudWatchEvents({ region: "REGION" });

// async/await.
try {
  const data = await client.activateEventSource(params);
  // process data.
} catch (error) {
  // error handling.
}

// Promises.
client
  .activateEventSource(params)
  .then((data) => {
    // process data.
  })
  .catch((error) => {
    // error handling.
  });

// callbacks.
client.activateEventSource(params, (err, data) => {
  // proccess err and data.
});
