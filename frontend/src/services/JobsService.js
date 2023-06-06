const axios = require('axios');

axios.interceptors.request.use(request => {
    // console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
});

export default {
    async getJobs() {
        let res = await axios.get("http://localhost:8000/jobs");
        console.log(res);
        return res.data;
    },
    async addJob(job) {
        const options = {
            method: 'POST',
            url: 'http://localhost:8000/jobs',
            headers: {
                'Content-Type': 'application/json'
            },
            data: job,
        }
        let res = await axios.request(options);
        return res.status;
    },
    async deleteJob(jobId) {
        let res = await axios.delete("http://localhost:8000/jobs/" + jobId);
        return res.status;
    },
    async updateJob(jobId, job) {
        const options = {
            method: 'PUT',
            url: 'http://localhost:8000/jobs/' + jobId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: job,
        }
        let res = await axios.request(options);
        return res.status;
    },
    async applyForJob(jobId, username) {
        const options = {
            method: 'PUT',
            url: `http://localhost:8000/jobs/apply/${jobId}/${username}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let res = await axios.request(options);
        return res.status;        
    },
    async removeApplication(jobId, username) {
        const options = {
            method: 'PUT',
            url: `http://localhost:8000/jobs/removeApplication/${jobId}/${username}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let res = await axios.request(options);
        return res.status;
    }
}