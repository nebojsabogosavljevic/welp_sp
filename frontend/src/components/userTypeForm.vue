<template>
    <div>
        <!-- <headLine/> -->
        <div class="form-div">
            <h4>Account Type:</h4>
            <div class="wrapper-pick-user-type">
                <button class="user-type-box" @click="setUserType('Employee')">
                    <div>
                        <div><p>Employee</p></div>
                        <ul>
                            <li>Work as much as you want!</li>
                            <li>Earn More!</li>
                            <li>Help someone</li>
                        </ul>
                    </div>
                </button>
                <button class="user-type-box" @click="setUserType('Employer')">
                    <div>
                        <div><p>Employer</p></div>
                        <ul>
                            <li>Employ people</li>
                            <li>increase your productivity</li>
                            <li>Give work opportunitie</li>
                        </ul>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
// import headLine from './headLine.vue';

export default {
    name: 'userTypeForm',
    components: {
        // headLine
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
        }
    },
    methods: {
        async setUserType(userType) {
            console.log(userType)
            this.$emit('set-user-type', userType)
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
        width: 500px;
        height: 300px;
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
    .wrapper-pick-user-type {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 20px;
        align-items: center;
        padding: 0 20px;
    }
    .user-type-box {
        border: 1px solid gray;
        border-radius: 10px;
        width: 200px;
        height: 200px;
        margin-left: 10px;
    }
    h4 {
        margin: 15px 0px;
    }
</style>