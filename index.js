const Redis = require("ioredis");
console.log(Redis);
const redis = new Redis({
  port: 6379,
  host: "localhost",
});

async function addJobToQueue(jobData) {
  try {
    await redis.rpush("job_queue", jobData);
    console.log(" Job bertambah di antrian : ", jobData);
  } catch (error) {
    console.error("error", error);
  }
}

async function processJobFromQueue() {
  try {
    const job = await redis.lpop("job_queue");
    if (job) {
      console.log("Processing job:", job);
    } else {
      console.log("No job available in the queue");
    }
  } catch (error) {
    console.error("Error processing job from queue:", error);
  }
}

// Contoh penggunaan
addJobToQueue("Job Data 1");
addJobToQueue("Job Data 2");
addJobToQueue("Job Data 3");
addJobToQueue("Job Data 4");
addJobToQueue("Job Data 5");
addJobToQueue("Job Data 6");

setTimeout(async () => {
  await processJobFromQueue();
  await processJobFromQueue();
}, 3000);