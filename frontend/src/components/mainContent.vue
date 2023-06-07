<template>
  <div class="mainBox">
    <h3 class="heading">Active Jobs</h3>
    <div class="jobs-table">
      <table id="customers">
        <tr>
          <th>Title</th>
          <th>Duration (h)</th>
          <th>Hardness</th>
          <th>Location</th>
          <th>Earn Rate (€/h)</th>
          <th v-if="getUserType === 'employee'">Apply for Job</th>
          <th v-if="getUserType === 'employer'">Edit Job</th>
          <th v-if="getUserType === 'employer'">Remove Job</th>
          <th v-if="getUserType === 'employer'">Applicants</th>
        </tr>
        <tr v-for="job in jobAdds" :key="job._id">
          <td>{{job.Title}}</td>
          <td>{{job.Duration}}</td>
          <td>{{job.Hardness}} <star-rating :number-of-stars="Number(job.Hardness.split('/')[0])" /></td>
          <td>{{job.Location}}</td>
          <td>{{job.Salary}}€</td>
          <td v-if="getUserType === 'employer'">
            <router-link :to="{ path: `editJob/${job._id}`, params: { jobData: job }, query: { ...job } }"><ui-button raised :size="size" type="secondary">Edit</ui-button></router-link>
          </td>
          <td v-if="getUserType === 'employer'">
            <ui-button color="red" raised :size="sm" type="secondary" @click="deleteJob(job._id)" v-on:keyup.delete="deleteJob(job._id)">Remove</ui-button>
          </td>
          <td v-if="getUserType === 'employer'">
            <ui-button color="green" raised :size="size" type="secondary" @click="openModal('modal6', job.Applicants)">Applicants</ui-button>
          </td>
          <td v-if="getUserType === 'employee' && !appliedToJob(job.Applicants)">
            <ui-button @click="applyForJob(job._id)" color="green" :size="size">Apply</ui-button>
          </td>
          <td v-if="getUserType === 'employee' && appliedToJob(job.Applicants)">
            <ui-button @click="removeApplication(job._id)" color="red" :size="size">Cancel</ui-button>
          </td>
        </tr>
      </table>
      <ui-alert @dismiss="showAlert1 = false" v-if="showAlert1">
            Welcome, {{ getUser }}!
      </ui-alert>
      <ui-alert @dismiss="showAlert2 = false" type="success" v-show="showAlert2">
          {{successMessage}}
      </ui-alert>
      <ui-alert @dismiss="showAlert4 = false" type="error" v-show="showAlert4">
          {{errorMessage}}
      </ui-alert>
    </div>
    <ui-modal ref="modal6" title="Applicants List">
        List of applicants for this job:
        <div>
            <ul class="list">
                <li v-for="applicant in aplicantsInModal" :key="applicant">{{ applicant }} <ui-button class="btn-accept-applicant" color="green" :size="small">Accept</ui-button><ui-button color="red" :size="size">Decline</ui-button></li>
            </ul>
        </div>
        <div slot="footer">
            <!-- <ui-button color="primary">Say Hi</ui-button> -->
            <ui-button @click="closeModal('modal6')">Close</ui-button>
        </div>
    </ui-modal>
  </div>
  </template>
  
  <script>
  import JobsService from '@/services/JobsService';
  import { mapGetters } from 'vuex';
  import starRating from './starRating.vue';

  export default {
    name: "mainContent",
    props: {},
    computed: {
        ...mapGetters(["isLoggedIn", "getUser", "getUserType", "showSuccess"])
    },
    components: {
      starRating
    },
    data() {
        return {
            jobAdds: [],
            showAlert1: false,
            aplicantsInModal: [],
            successMessage: '',
            errorMessage: '',
        };
    },
    created() {
        this.getJobs();
        this.showAlert1 = true;
        setTimeout(() => {
            this.showAlert1 = false
        }, 3000)
    },
    methods: {
      openModal(ref, jobApplicants) {
            this.$refs[ref].open();
            this.aplicantsInModal = jobApplicants;
        },
        closeModal(ref) {
            this.$refs[ref].close();
        },
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
            console.log(response.status);
            this.successMessage = "Successfully applied for job!";
            this.showAlert2 = true;
            setTimeout(() => {
                this.showAlert2 = false
            }, 2000);
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
  .list {
    list-style-type: none; /* Remove the default bullet points */
    padding: 0; /* Remove default padding */
    margin: 0; /* Remove default margin */
  }

  .list li {
    display: block; /* Display each list item as a block element */
    margin-bottom: 5px; /* Add some vertical spacing between list items */
  }
  .btn-accept-applicant {
    margin: 0px 50px;
  }
  </style>
  
  