const request = require('supertest');
const app = require('../server');
const { ObjectId } = require('mongodb');
const { Job } = require('../models/jobs');

// Clear the database before each test
beforeEach(async () => {
  await Job.deleteMany({});
});

describe('Jobs API', () => {
  it('should return all jobs', async () => {
    const response = await request(app).get('/jobs');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should create a new job', async () => {
    const newJob = { title: 'Software Engineer', company: 'ABC Corp' };
    const response = await request(app).post('/jobs').send(newJob);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(newJob.title);
    expect(response.body.company).toBe(newJob.company);
  });

  it('should get a job by ID', async () => {
    const job = new Job({ title: 'Software Engineer', company: 'ABC Corp' });
    await job.save();
    const response = await request(app).get(`/jobs/${job._id}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(job.title);
    expect(response.body.company).toBe(job.company);
  });

  it('should update a job by ID', async () => {
    const job = new Job({ title: 'Software Engineer', company: 'ABC Corp' });
    await job.save();
    const updatedJob = { title: 'Senior Software Engineer' };
    const response = await request(app).put(`/jobs/${job._id}`).send(updatedJob);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedJob.title);
  });

  it('should add an applicant to a job', async () => {
    const job = new Job({ title: 'Software Engineer', company: 'ABC Corp' });
    await job.save();
    const username = 'testuser';
    const response = await request(app).put(`/jobs/apply/${job._id}/${username}`);
    expect(response.status).toBe(200);
    expect(response.body.Applicants).toContain(username);
  });

  it('should remove an applicant from a job', async () => {
    const job = new Job({ title: 'Software Engineer', company: 'ABC Corp', Applicants: ['testuser'] });
    await job.save();
    const username = 'testuser';
    const response = await request(app).put(`/jobs/removeApplication/${job._id}/${username}`);
    expect(response.status).toBe(200);
    expect(response.body.Applicants).not.toContain(username);
  });

  it('should delete a job by ID', async () => {
    const job = new Job({ title: 'Software Engineer', company: 'ABC Corp' });
    await job.save();
    const response = await request(app).delete(`/jobs/${job._id}`);
    expect(response.status).toBe(200);
    expect(response.body.deletedCount).toBe(1);
  });
});
