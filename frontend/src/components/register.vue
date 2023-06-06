<template>
    <div>
        <headLine/>
        <userTypeForm @set-user-type="setUserType" v-if="!userType"/>
        <div class="form-div" v-if="userType">
           <h3>Register as {{ userType }}</h3>
           <form @submit.prevent="register" v-if="userType === 'Employee'">
                <div class="row">
                    <label for="email">Name </label>
                    <input type="text" name="email" id="" v-model="name">
                </div>
                <div class="row">
                    <label for="email">Surname </label>
                    <input type="text" name="email" id="" v-model="surname">
                </div>
                <div class="row">
                    <label for="username">Username </label>
                    <input type="text" name="username" id="" v-model="username">
                </div>
                <div class="row">
                    <label for="password">Password </label>
                    <input type="text" name="password" id="" v-model="password">
                </div>
                <div class="row">
                    <label for="repPassword">Repeat password </label>
                    <input type="text" name="repPassword" id="" v-model="repPassword">
                </div>
                <div class="row">
                    <label for="email">Email </label>
                    <input type="text" name="email" id="" v-model="email">
                </div>
                <div class="row">
                    <label for="telNum">Telephone number </label>
                    <input type="text" name="telNum" id="" v-model="telNumber">
                </div>
                <div class="row">
                    <label for="telNum">City </label>
                    <input type="text" name="city" id="" v-model="city">
                </div>
                <div class="row">
                    <label for="telNum">Country </label>
                    <input type="text" name="country" id="" v-model="country">
                </div>
                <div class="row">
                    <label for="telNum">Address </label>
                    <input type="text" name="address" id="" v-model="address">
                </div>
                <div class="row">
                    <label for="telNum">ID Card number </label>
                    <input type="text" name="idCardNumber" id="" v-model="idCardNumber">
                </div>
                <div class="row">
                    <label for="telNum">Citizenship </label>
                    <input type="text" name="citizenship" id="" v-model="citizenship">
                </div>
                <div class="row">
                    <label for="telNum">Resident </label>
                    <input type="text" name="resident" id="" v-model="resident">
                </div>
                <div class="row">
                    <label for="telNum">Education </label>
                    <input type="text" name="education" id="" v-model="education">
                </div>
                <div class="row">
                    <label for="telNum">Expirience </label>
                    <input type="text" name="expirience" id="" v-model="expirience">
                </div>
                <div class="row">
                    <label for="telNum">Languages </label>
                    <input type="text" name="languages" id="" v-model="languages">
                </div>
                <div class="row">
                    <label for="telNum">Skills </label>
                    <input type="text" name="skills" id="" v-model="skills">
                </div>
                <button class="btn-post">Register</button>
             </form>

             <form @submit.prevent="register" v-if="userType === 'Employer'">
                <div class="row">
                    <label for="email">Name </label>
                    <input type="text" name="email" id="" v-model="name">
                </div>
                <div class="row">
                    <label for="email">Surname </label>
                    <input type="text" name="email" id="" v-model="surname">
                </div>
                <div class="row">
                    <label for="email">Email </label>
                    <input type="text" name="email" id="" v-model="email">
                </div>
                <div class="row">
                    <label for="username">Username </label>
                    <input type="text" name="username" id="" v-model="username">
                </div>
                <div class="row">
                    <label for="password">Password </label>
                    <input type="text" name="password" id="" v-model="password">
                </div>
                <div class="row">
                    <label for="repPassword">Repeat password </label>
                    <input type="text" name="repPassword" id="" v-model="repPassword">
                </div>
                <div class="row">
                    <label for="telNum">Phone </label>
                    <input type="text" name="telNum" id="" v-model="telNumber">
                </div>
                <div class="row">
                    <label for="telNum">City </label>
                    <input type="text" name="city" id="" v-model="city">
                </div>
                <div class="row">
                    <label for="telNum">Country </label>
                    <input type="text" name="country" id="" v-model="country">
                </div>
                <div class="row">
                    <label for="telNum">Address </label>
                    <input type="text" name="address" id="" v-model="address">
                </div>
                <button class="btn-post">Register</button>
             </form>
       </div>
    </div>
</template>

<script>
import headLine from './headLine.vue';
import loginRegisterService from '../services/loginRegisterService.js';
import userTypeForm from './userTypeForm.vue';

export default {
    name: 'registerAccount',
    props: {
    },
    components: {
        headLine,
        userTypeForm
    },
    data() {
        return {
            name: '',
            surname: '',
            email: '',
            username: '',
            password: '',
            repPassword: '',
            telNumber: '',
            city: '',
            country: '',
            address: '',
            userType: '',
            languages: '',
            skills: '',
            education: '',
            expirience: '',
            citizenship: '',
            resident: '',
            idCardNumber: ''
        }
    },
    methods: {
        setUserType(paload) {
            console.log(paload)
            this.userType = paload
            sessionStorage.setItem('userType', paload)
        },
        async register() {
            console.log("asdasd", this.userType)
            let response = null;
            if (this.password !== this.repPassword) {
                alert('Please repeat password correctly')
                return
            }
            if (this.userType === 'Employer') {
                response = await loginRegisterService.registerEmployer(this.name, this.surname, this.username, this.password, this.email, this.telNumber, this.city, this.country, this.address);
            } else if (this.userType === 'Employee') {
                response = await loginRegisterService.registerEmployee(this.name, this.surname, this.username, this.password, this.email, this.telNumber, this.city, this.country, this.address, this.idCardNumber, this.citizenship, this.languages);
            }
            if (response.status) {
                alert('Register Successful')
            } else {
                alert(`Register Failed: ${response.message}`)
            }
            this.$router.push('/')
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
    .btn-post {
        background: #1a4b6eeb;
        padding: 10px 30px;
        color: #FFFFFF;
        font-size: 20px;
        border-radius: 12px;
        border: none;
        margin: 20px;
    }
</style>