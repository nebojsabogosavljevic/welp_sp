<template>
    <div style="display: flex; margin-left: 40px;">
        <div v-for="coloredStars in numberOfStars" :key="coloredStars">
            <p style="color: #ffc700">★</p>
        </div>
        <div v-for="defaultStars in (5 - numberOfStars) " :key="defaultStars">
            <p style="color: #3837320f">★</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'startRating',
    props: {
        numberOfStars: {
            type: Number,
            default: 0
        }
    },
    mounted() {
        console.log("num of start: ", this.numberOfStars)

    },
    data() {
        return {
        }
    }
}

</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}
.rate {
    float: left;
    height: 46px;
    padding: 0 10px;
}
.rate:not(:checked) > input {
    position:absolute;
    top:-9999px;
}
.rate:not(:checked) > label {
    float:right;
    width:1em;
    overflow:hidden;
    white-space:nowrap;
    cursor:pointer;
    font-size:30px;
    color:#ccc;
}
.rate:not(:checked) > label:before {
    content: '★ ';
}
.rate > input:checked ~ label {
    color: #ffc700;    
}
.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
    color: #deb217;  
}
.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
    color: #c59b08;
}
</style>