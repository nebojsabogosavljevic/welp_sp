<template>
    <div>
        <headLine/>
        <userTypeForm @set-user-type="setUserType" v-if="!userType"/>
        <div class="form-div" v-else>
           <h3>Login to Account</h3>
           <form @submit.prevent="login">
                <div class="row">
                    <label for="username">Username </label>
                    <input type="text" name="username" v-model="username">
                </div>
                <div class="row">
                    <label for="password">Password </label>
                    <input type="password" name="password" v-model="password">
                </div>
                <button class="btn-post">Login</button>
             </form>
       </div>
        <ui-alert @dismiss="showAlert4 = false" type="error" v-show="wrongPassword">
            Wrong Password. Please try again!
        </ui-alert>
    </div>
</template>

<script>
import headLine from './headLine.vue';
import loginRegisterService from '../services/loginRegisterService.js';
import { mapActions, mapGetters } from 'vuex';
import userTypeForm from './userTypeForm.vue';

export default {
    name: 'loginAccount',
    props: {
    },
    components: {
        headLine,
        userTypeForm
    },
    data() {
        return {
            username: '',
            password: '',
            userType: '',
            wrongPassword: false
        }
    },
    computed: {
        ...mapGetters(['getUser'])
    },
    methods: {
        ...mapActions(['loginSetData', 'setUserObj', 'showSuccess']),
        async login() {
            const response = await loginRegisterService.login(this.username, this.password, this.userType)
            if (response.status) {
                this.showSuccess('Login Successful')
                this.setUserObj({ username: this.username, userType: this.userType.toLowerCase() })
            } else {
                this.wrongPassword = true
                setTimeout(() => {
                    this.wrongPassword = false
                }, 3000)
                return;
            }
            this.loginSetData({user: this.username, token: response?.token, userType: this.userType});
            this.$router.push('/')
        },
        setUserType(paload) {
            this.userType = paload
            sessionStorage.setItem('userType', paload)
        },
    }
}

</script>

<style scoped>
    .form-div {
        display: inline-block;
        width: 400px;
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