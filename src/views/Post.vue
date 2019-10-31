<template>
    <div class="row justify-content-center">
        <template v-if="Object.keys(result).length > 0">
            <app-list-content :tile="result" type="detail" header></app-list-content>
        </template>
    </div>
</template>
<script>
import axios from "axios";
import ListContent from "../components/ListContent";
export default {
    data() {
        return {
            result: {}
        };
    },
    components: {
        appListContent: ListContent
    },
    methods: {
        getData() {
            let vm = this;
            let listing =
                "/r/" +
                vm.$route.params.subreddit +
                "/comments/" +
                vm.$route.params.postid +
                "/" +
                vm.$route.params.postlink;
            listing += ".json";
            axios
                .get(listing, {
                    params: {
                        limit: 1,
                        depth: 1
                    }
                })
                .then(res => {
                    res.data.forEach(el => {
                        if (el.data.children.length == 1) {
                            el.data.children.forEach(element => {
                                if (
                                    element.data.id == vm.$route.params.postid
                                ) {
                                    vm.result = element.data;
                                }
                            });
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                    vm.result = [];
                });
        }
    },
    created() {
        let vm = this;
        vm.getData();
    }
};
</script>