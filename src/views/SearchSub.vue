<template>
    <div class="row justify-content-center">
        <div class="col-md-12 float-left">
            <app-sort></app-sort>
        </div>
        <template v-if="result.length > 0">
            <app-list-content
                v-for="(list,index) in result"
                :key="index"
                :tile="list.data"
                :header="redditData"
                type="list"
            ></app-list-content>
        </template>
    </div>
</template>

<script>
import axios from "axios";
import ListContent from "../components/ListContent";
import Sort from "../components/Sort";
export default {
    data() {
        return {
            result: [],
            after: null,
            scrolledToBottom: false,
            searchString: "",
            sort: null,
            redditData: ""
        };
    },
    components: {
        appListContent: ListContent,
        appSort: Sort
    },
    methods: {
        getData() {
            let vm = this;
            if (
                vm.searchString != vm.$route.params.searchString ||
                vm.sort != vm.$route.query.sort
            ) {
                vm.result = [];
                vm.after = null;
                vm.sort = null;
            }
            vm.searchString = vm.$route.params.searchString;
            vm.sort = vm.$route.query.sort;
            vm.fetchSub();
            axios
                .get("/r/" + vm.$route.params.subreddit + "/search.json", {
                    params: {
                        q: vm.searchString,
                        limit: 10,
                        after: vm.after,
                        sort: vm.sort,
                        restrict_sr: 1
                    }
                })
                .then(res => {
                    vm.after = res.data.data.after;
                    vm.result.push(...res.data.data.children);
                })
                .catch(err => {
                    console.log(err);
                    vm.result = [];
                });
        },
        scroll() {
            let vm = this;
            window.onscroll = () => {
                let bottomOfWindow =
                    Math.max(
                        window.pageYOffset,
                        document.documentElement.scrollTop,
                        document.body.scrollTop
                    ) +
                        window.innerHeight ===
                    document.documentElement.offsetHeight;

                if (bottomOfWindow) {
                    vm.scrolledToBottom = true; // replace it with your code
                }
            };
        },
        fetchSub() {
            let vm = this;
            if (
                vm.$route.params.subreddit != "popular" &&
                vm.$route.params.subreddit != "all"
            ) {
                axios
                    .get("/r/" + vm.$route.params.subreddit + "/about.json")
                    .then(res => {
                        if (!res.data.error) {
                            vm.redditData = res.data.data;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                vm.redditData = "";
            }
        }
    },
    created() {
        let vm = this;
        vm.getData();
    },
    mounted() {
        let vm = this;
        vm.scroll();
    },
    watch: {
        // call again the method if the route changes
        $route: "getData",
        scrolledToBottom: function() {
            let vm = this;
            if (vm.scrolledToBottom) {
                vm.getData();
                vm.scrolledToBottom = false;
            }
        }
    }
};
</script>