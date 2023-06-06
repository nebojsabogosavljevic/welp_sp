<template>
    <div>
        <headLine/>
        <div class="form-div">
           <h3>Create job</h3>
           <div>
               <div class="row">
                   <label for="jobTitle">Job title </label>
                   <input v-model="jobTitle" type="text" name="jobTitle" id="" >
               </div>
               <div class="row">
                   <label for="jobCategory">Job category </label>
                   <input v-model="jobCategory" type="text" name="jobCategory" id="">
               </div>
               <div class="row">
                   <label for="jobLocation">Job location </label>
                   <input v-model="jobLocation" type="text" name="jobLocation" id="">
               </div>
               <div class="row">
                   <label for="jobDate">Job date </label>
                   <input v-model="jobDate" type="text" name="jobDate" id="">
               </div>
               <div class="row">
                   <label for="jobTime">Job time </label>
                   <input v-model="jobTime" type="text" name="jobTime" id="">
               </div>
               <div class="row">
                   <label for="jobDuration">Job duration </label>
                   <input v-model="jobDuration" type="text" name="jobDuration" id="">
               </div>
               <div class="row">
                   <label for="jobPrice">Job price </label>
                   <input v-model="jobPrice" type="text" name="jobPrice" id="">
               </div>
               <div class="row">
                   <label for="jobDescription">Job description </label>
                   <input v-model="jobDescription" type="text" name="jobDescription" id="">
               </div>
               <div class="row">
                   <label for="jobHardness">Job hardness </label>
                   <input v-model="jobHardness" type="text" name="jobHardness" id="">
               </div>
                <button @click="createJob()" v-on:keyup.enter="createJob()" class="job-add">Post Job</button>
           </div>
       </div>
    </div>
</template>

<script>
import JobsService from '@/services/JobsService';
import headLine from '@/components/headLine.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'createJob',
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
            jobTitle: '' || this.jobData.Title,
            jobCategory: '',
            jobLocation: '',
            jobDate: '',
            jobTime: '',
            jobDuration: '',
            jobPrice: '',
            jobDescription: '',
            jobHardness: ''
        }
    },
    created() {
        console.log(this.jobData)
    },
    methods: {
        async createJob() {
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
            console.log(this.user.id)
            const resp = await JobsService.addJob(job)
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