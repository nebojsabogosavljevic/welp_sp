<template>
  <div class="mainBox">
    <h3 class="heading">Active Jobs</h3>
    <div class="jobs-table">
      <table id="customers">
        <tr>
          <th>Title</th>
          <th>Duration</th>
          <th>Hardness</th>
          <th>Location</th>
          <th>Earn Rate</th>
          <th v-if="getUserType === 'employee'">Apply for Job</th>
          <th v-if="getUserType === 'employer'">Edit Job</th>
          <th v-if="getUserType === 'employer'">Remove Job</th>
        </tr>
        <tr v-for="job in jobAdds" :key="job._id">
          <td>{{job.Title}}</td>
          <td>{{job.Duration}}</td>
          <td>{{job.Hardness}}</td>
          <td>{{job.Location}}</td>
          <td>{{job.Salary}}</td>
          <td v-if="getUserType === 'employer'">
            <router-link :to="{ path: `editJob/${job._id}`, params: { jobData: job }, query: { ...job } }"><button >Edit</button></router-link>
          </td>
          <td v-if="getUserType === 'employer'">
            <button class="" @click="deleteJob(job._id)" v-on:keyup.delete="deleteJob(job._id)">Remove</button>
          </td>
          <td v-if="getUserType === 'employee' && !appliedToJob(job.Applicants)">
            <button @click="applyForJob(job._id)">Apply</button>
          </td>
          <td v-if="getUserType === 'employee' && appliedToJob(job.Applicants)">
            <button @click="removeApplication(job._id)">Cancel Application</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
  </template>
  
  <script>
  import JobsService from '@/services/JobsService';
  import { mapGetters } from 'vuex';

  export default {
    name: "mainContent",
    props: {},
    computed: {
        ...mapGetters(["isLoggedIn", "getUser", "getUserType", "showSuccess"])
    },
    comments: {
    },
    data() {
        return {
            jobAdds: []
        };
    },
    created() {
        this.getJobs();
    },
    methods: {
        appliedToJob(jobApplicants) {
          console.log(jobApplicants);
            return jobApplicants.includes(this.getUser);
        },
        async applyForJob(id) {
            const response = await JobsService.applyForJob(id, this.getUser);
            this.jobAdds = this.jobAdds.map(job => {
                if (job._id === id) {
                    job.Applicants.push(this.getUser);
                }
                return job;
            });
            console.log(response);
        },
        async removeApplication(id) {
            const response = await JobsService.removeApplication(id, this.getUser);
            this.jobAdds = this.jobAdds.map(job => {
                if (job._id === id) {
                    job.Applicants = job.Applicants.filter(applicant => applicant !== this.getUser);
                }
                return job;
            });
            console.log(response);
        },
        async getJobs() {
            // Use the eventService to call the getEventSingle() method
            JobsService.getJobs()
                .then((event => {
                this.jobAdds = event;
            }).bind(this));
            localStorage.setItem("jobs", JSON.stringify(this.jobAdds));
        },
        editJob(job) {
            console.log("edit", job);
        },
        async deleteJob(jobId) {
            const resp = await JobsService.deleteJob(jobId);
            this.jobAdds = this.jobAdds.filter(job => job._id !== jobId);
            console.log(resp);
            if (resp === 200) {
                alert("Job deleted successfully");
            }
            else {
                alert("Job not deleted");
            }
        }
    },
}
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  #customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  #customers td, #customers th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  #customers tr:nth-child(even) { background-color: #f2f2f2; }

  #customers tr:hover { background-color: #ddd; }

  #customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #80369F;
    color: white;
  }
  .mainBox {
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
    padding: 24px;
    margin: 48px 150px;
  }
  .header {
    height: auto;
    vertical-align: middle;
    display: flex;
    align-items: center;
  }
  .logo {
    margin-left: 3%;
    width: 100%;
    height: 100%;
    max-width: 160px !important;
    max-height: 50px !important;
  }
  .body {
    widows: 80%; 
  }
  .header input {
    width: 20%;
    border-radius: 8px;
    border: solid 1px;
    margin-left: 8%;
  }
  .header div {
    width: 10%;
    float: right;
  }

  .bodyBack {
    background-color: #f5f5f5;
  }
  h3 {
    margin: 40px 0 40px 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .heading {
    font-weight: 700;
    text-align: center;
    color: #000000
  }
  .jobs-table {
    overflow:hidden;
    overflow-y: scroll;
    height: 500px;
  }
  .border333 {
    border-radius: 3px;
    background-color: #f44336;
    color: white;
}

  .border3 {
      border-radius: 3px;
      background-color: white;
      color: black;
      border: 2px solid #f44336;
  }
  .btn {
      background-color: #4CAF50;
      border: none;
      color: #FFFFFF;
      padding: 15px 32px;
      text-align: center;
      -webkit-transition-duration: 0.4s;
      transition-duration: 0.4s;
      margin: 16px 0 !important;
      text-decoration: none;
      font-size: 16px;
      cursor: pointer;
  }
  </style>
  