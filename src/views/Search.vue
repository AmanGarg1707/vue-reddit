<template>
    <div class="row justify-content-center">
        <div class="col-md-12 float-left">
            <app-sort></app-sort>
        </div>
        <template v-if="result.length > 0">
            <template v-if="type">
                <app-list-content
                    v-for="(list,index) in result"
                    :key="index"
                    :tile="list.data"
                    header
                    type="community"
                ></app-list-content>
            </template>
            <template v-else>
                <app-list-content
                    v-for="(list,index) in result"
                    :key="index"
                    :tile="list.data"
                    header
                    type="list"
                ></app-list-content>
            </template>
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
            type: null
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
                vm.type != vm.$route.query.type ||
                vm.sort != vm.$route.query.sort
            ) {
                vm.result = [];
                vm.after = null;
                vm.sort = null;
                vm.type = null;
            }
            vm.searchString = vm.$route.params.searchString;
            vm.sort = vm.$route.query.sort;
            vm.type = vm.$route.query.type;
            axios
                .get("/search.json", {
                    params: {
                        q: vm.searchString,
                        limit: 10,
                        after: vm.after,
                        sort: vm.sort,
                        type: vm.type
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