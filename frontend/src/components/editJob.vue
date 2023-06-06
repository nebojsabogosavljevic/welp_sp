<template>
    <div>
        <headLine/>
        <div class="form-div">
           <h3>Edit job</h3>
           <div>
               <div class="row">
                   <label for="jobTitle">Title </label>
                   <input v-model="jobTitle" type="text" name="jobTitle" >
               </div>
               <div class="row">
                   <label for="jobCategory">Category </label>
                   <input v-model="jobCategory" type="text" name="jobCategory">
               </div>
               <div class="row">
                   <label for="jobLocation">Location </label>
                   <input v-model="jobLocation" type="text" name="jobLocation">
               </div>
               <div class="row">
                   <label for="jobDate">Date </label>
                   <input v-model="jobDate" type="text" name="jobDate">
               </div>
               <div class="row">
                   <label for="jobTime">Time </label>
                   <input v-model="jobTime" type="text" name="jobTime">
               </div>
               <div class="row">
                   <label for="jobDuration">Duration </label>
                   <input v-model="jobDuration" type="text" name="jobDuration">
               </div>
               <div class="row">
                   <label for="jobPrice">Price </label>
                   <input v-model="jobPrice" type="text" name="jobPrice">
               </div>
               <div class="row">
                   <label for="jobDescription">Description </label>
                   <input v-model="jobDescription" type="text" name="jobDescription">
               </div>
               <div class="row">
                   <label for="jobHardness">Hardness </label>
                   <input v-model="jobHardness" type="text" name="jobHardness">
               </div>
                <button @click="editJob()" v-on:keyup.enter="editJob()" class="job-add">Update Job</button>
           </div>
       </div>
    </div>
</template>

<script>
import JobsService from '@/services/JobsService';
import headLine from '@/components/headLine.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'editJob',
    props:{
          jobData:{
            type: Object,
            required: false,
          }
    },
    components: {
        headLine,
        ...mapGetters(['user'])
    },
    data() {
        return {
            jobTitle: "",
            jobCategory: "",
            jobLocation: "",
            jobDate: "",
            jobTime: "",
            jobDuration: "",
            jobPrice: "",
            jobDescription: "",
            jobHardness: ""
        }
    },
    created() {
        // console.log(this.jobData)
    },
    mounted() {
        console.log(this.$route.query);
        this.jobTitle = this.$route.query.Title;
        this.jobCategory = this.$route.query.Category || "";
        this.jobLocation = this.$route.query.Location;
        this.jobDate = this.$route.query.Date;
        this.jobTime = this.$route.query.Time || "";
        this.jobDuration = this.$route.query.Duration;
        this.jobPrice = this.$route.query.Salary;
        this.jobDescription = this.$route.query.Description;
        this.jobHardness = this.$route.query.Hardness;
    },
    methods: {
        async editJob() {
            const job = {
                Title: this.jobTitle,
                Category: this.jobCategory,
                Location: this.jobLocation,
                Date: this.jobDate,
                Time: this.jobTime,
                Duration: this.jobDuration,
                Salary: this.jobPrice,
                Description: this.jobDescription,
                Hardness: this.jobHardness,
            }
            const resp = await JobsService.editJob(job)
            if (resp === 200) {
                alert("Job added successfully")
            } else {
                alert("Job not added")
            }
        }
    }
}

</script>

<style scoped>
    .form-div {
        display: inline-block;
        width: 400px;
        /* border: 1px solid; */
        background: #ffffff;
        box-shadow: #63636333 0 2px 8px;  
        border-radius: 8px;
        margin-top: 5%;
    }
    .row {
        display: flex;
        margin: 10px 20px;
    }
    .row label {
        width: 150px;
    }
    .row input {
        width: 200px;
        justify-self: unset;
    }
    h3 {
        text-align: center;
        margin: 20px 0px;
    }
    .job-add {
        background: #1a4b6eeb;
        padding: 10px 30px;
        color: #FFFFFF;
        font-size: 20px;
        border-radius: 12px;
        border: none;
        margin: 20px;
    }
</style>