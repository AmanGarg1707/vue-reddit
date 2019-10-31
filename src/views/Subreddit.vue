<template>
    <div class="row justify-content-center">
        <div class="col-md-12 float-left">
            <app-sort></app-sort>
        </div>
        <template v-if="result.length > 0">
            <template v-if="redditData && (subreddit != 'popular' && subreddit != 'all')">
                <app-list-content :header="redditData" type="heading"></app-list-content>
            </template>
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
            subreddit: "",
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
                vm.subreddit != vm.$route.params.subreddit ||
                vm.sort != vm.$route.params.sort
            ) {
                vm.result = [];
                vm.after = null;
            }
            vm.subreddit = vm.$route.params.subreddit;
            let listing = "/r/" + vm.subreddit;
            if (vm.$route.params.sort) {
                vm.sort = vm.$route.params.sort;
                listing += "/" + vm.sort;
            }
            listing += ".json";
            vm.fetchSub();
            axios
                .get(listing, {
                    params: {
                        limit: 10,
                        after: vm.after
                    }
                })
                .then(res => {
                    vm.after = res.data.data.after;
                    vm.result.push(...res.data.data.children);
                    // console.log(vm.result);
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
            if (vm.subreddit != "popular" && vm.subreddit != "all") {
                axios
                    .get("/r/" + vm.subreddit + "/about.json")
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