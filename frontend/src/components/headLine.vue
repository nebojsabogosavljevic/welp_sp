<template>
    <nav>
        <div class="headline">
            <div>
                <div>
                    <img src="@/assets/welpLogo.png" class="logo" alt="" @click="goHome"/>
                </div>
                <div class="ul-list" v-if="!isLoggedIn">
                    <a href="createJob"></a>
                    <router-link :to="{ name: 'login' }">News</router-link>
                    <router-link :to="{ name: 'login' }">FAQ</router-link>
                    <router-link :to="{ name: 'login' }">Login</router-link>
                    <router-link :to="{ name: 'register' }">Register</router-link>
                    <router-view></router-view>
                </div>
                <div class="ul-list" v-else-if="isLoggedIn && getUserType === 'employer'">
                    <a href="createJob"></a>
                    <router-link :to="{ name: 'createJob' }">Create a job</router-link>
                    <router-link :to="{ name: 'findJob' }">List Of My Jobs</router-link>
                    <router-link :to="{ name: 'profile' }">Profile</router-link>
                    <router-link :to="{ name: 'login', params: { origin: 'logout'} }">Log out</router-link>
                    <router-view></router-view>
                </div>
                <div class="ul-list" v-else-if="isLoggedIn && getUserType === 'employee'">
                    <a href="createJob"></a>
                    <!-- <router-link :to="{ name: 'createJob' }">My applications</router-link> -->
                    <router-link :to="{ name: 'earnings' }">Earnings</router-link>
                    <router-link :to="{ name: 'profile' }">Profile</router-link>
                    <router-link :to="{ name: 'login', params: { origin: 'logout'} }">Log out</router-link>
                    <router-view></router-view>
                </div>
                <div class="user-info">
                    <p>Welcome {{ getUserType }}, {{ getUser }}</p>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: 'headLine',
    props: {
    },
    computed: {
        ...mapGetters(["isLoggedIn", "getUser", "getUserType"]),
    },
    data() {
        return {
        }
    },
    methods: {
        goHome() {
            this.$router.push('/')
        },
    },
}
</script>

<style>
    nav {
        background: #ffffff;
        height: 70px;
        box-shadow: #63636333 0 2px 8px;   
    }
    nav .wrapper {
        position: relative;
        padding: 0 30px;
        height: 70px;
        line-height: 70px;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .logo {
        max-height: 50px !important;
        /* margin-left: 160px; */
        padding: 0px 40px;
    }
    .leftMenu {
        text-align: left;
    }
    a {
        margin: 0px 20px;
        font-family: latoregular,sans-serif;
        line-height: 55px;
        text-align: center;
        text-decoration: none !important;
        font-size: 16px;
        letter-spacing: .2px;
        color: #444 !important;
        white-space: nowrap;
    }
    .headline {
        display: flex;
        /* display: inline-block; */
        margin: 0px 120px;
        padding: 0px 30px;
    }
    .headline div:first-child {
        float: left;
        width: 100%;
        vertical-align: middle;
        display: flex;
        align-items: center;
    }
    .headline div:nth-child(2) {
        float: right;
        height: 55px;
        vertical-align: middle;
        display: flex;
        align-items: center;
    }
    .ul-list {
        color: #000;
        text-decoration: none;
        font-size: 16px;
        font-weight: 500;
        padding: 9px 15px;
        border-radius: 5px;
        transition: all .3s ease;
    }
    .user-info {
        font: roboto;
        font-size: 16px;
        font-weight: 500;
        color: #000;
    }
    .user-info p {
        font: roboto;
        font-size: 16px;
        font-weight: 500;
        color: #000;
    }
</style>