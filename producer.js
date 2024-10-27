const { Queue } = require('bullmq');
const Redis = require('ioredis');
require('dotenv').config();

const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

const emailQueue = new Queue('emailQueue', { connection });

async function sendEmailJob() {
  await emailQueue.add('sendEmail', {
    to: 'user@example.com',
    subject: 'Bem vindo!',
    body: 'Olá! testando.'
  });
  console.log('Job added to the queue');
}

sendEmailJob().catch((err) => console.error('Failed to add job:', err));
