<template>
    <div class="footer">
        <div>
            <div>
                <p>How to become a performer</p>
                <p>FAQ</p>
                <p>Contacts</p>
                <p>Customer feedback</p>
            </div>
            <div class="wrapper">
                <p>WELP for buisnesses</p>
                <p>Blog</p>
                <p>Support</p>
                <p>Add Something 1</p>
                <p>Add Something 1</p>
            </div>
            <div></div>
        </div>
        <div>
            <div>
                <p>© 2022 WELP (welp.com) Terms of Service</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'pageBottom',
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

<style scoped>
.footer {
    width: 100%;
    background-color: #2c2f50;
}
.footer div:nth-child(2) {
    text-align: left;
}
.footer div:nth-child(2) p {
    position: relative;
    border-top: 1px solid rgba(255,255,255,.20);
    padding-top: 19px;
    display: block;
    font-size: 14px;
    line-height: 27px;
    color: rgba(255,255,255,0.5) !important;
    font-weight: 400;
    text-align: center;
}
.footer #footerInfoSection {
    display: inline-block;
    /* border-bottom: 1px solid rgba(255,255,255,.20); */
    width: 100%;
}
.footer #footerInfoSection div:first-child {
    float: left;
}
.footer #footerInfoSection div:nth-child(2) {
    float: right;
    vertical-align: top;
}
p {
    color: white !important;
    font-size: 15px;
}

.wrapper {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
}
</style>