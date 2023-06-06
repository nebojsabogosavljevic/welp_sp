<template>
    <div>
        <headLine/>
        <div>
            <h1>Profile</h1>
            <p>Username: {{getUser.username}}</p>
            <p>Email: {{getUser.email}}</p>
            <p>Account Type: {{getUserType}}</p>
        </div>
    </div>
</template>

<script>
import headLine from './headLine.vue';

export default {
    name: 'accountProfile',
    components: {
        headLine
    },
    data() {
        return {
        }
    }
}

</script>