const { Worker } = require('bullmq');
const Redis = require('ioredis');
require('dotenv').config();

const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

const emailWorker = new Worker(
  'emailQueue',
  async (job) => {
    console.log(`Enviando para ${job.data.to}`);
    console.log(`Assunto: ${job.data.subject}`);
    console.log(`Corpo: ${job.data.body}`);
    await new Promise((resolve) => setTimeout(resolve, 2000)); 
    console.log('Email enviado');
  },
  { connection }
);

emailWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

emailWorker.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed, error: ${err.message}`);
});
