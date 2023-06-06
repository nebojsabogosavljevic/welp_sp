<template>
    <div class="instructions-line">
        <div class="section-left">
            <div>
                <h2>How to get WELP successfuly</h2>
            </div>
            <div class="ul-list">
                <p>Create a job offering</p>
                <p>Get offers from WELPers</p>
                <p>Choose the best offer</p>
                <p>Get the job done successfuly with our WELP!</p>
            </div>
        </div>
        <div class="section-right">
            <div>
                <h2>How to WELP successfuly</h2>
            </div>
            <div class="ul-list">
                <p>Search for a job that suits your traits</p>
                <p>Apply for jobs that fit you the most</p>
                <p>Get hired by the best employers</p>
                <p>WELP you employee and earn!</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'instructionsLine',
    props: {
    },
    components: {
    },
    data() {
        return {
        }
    }
}
</script>

<style>
    .instructions-line {
        display: flex;
        width: 100%;
        color: #FFFFFF;
    }
    .instructions-line .section-left {
        float: left;
        width: 50%;
        text-align: center;
        margin: 30px 0px;
        padding: 20px 0px;
    }
    .instructions-line .section-right {
        float: right;
        text-align: center;
        width: 50%;
        padding: 20px 0px;
        margin: 30px 0px;
        border-left: 1px solid rgba(255,255,255,.20);
    }
    .ul-list {
        width: 50%;
        margin-left: 30%;
        text-align: left;
    }
    p {
        color: rgba(255,255,255,0.75);
        margin-top: 11px;
        line-height: 1.2em;
    }
</style>