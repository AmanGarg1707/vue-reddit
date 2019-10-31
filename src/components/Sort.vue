<template>
    <div class="col-md-12 sort">
        <div class="sort-by float-left">sort by</div>
        <div class="sort-by-option" @click="showList = !showList">
            <i :class="sortIcon(sort)" :style="{'margin-right':'2px', color: '#536dfe'}"></i>
            {{sort}}
        </div>
        <div class="sort-by-list" v-if="showList">
            <div
                class="sort-options"
                v-for="(option,index) in sortFilter(sortList)"
                :key="index"
                :class="{ active: sort == option }"
                @click="addSort(option)"
            >
                <div class="option-icon" :class="{ active: sort == option }">
                    <i :class="sortIcon(option)"></i>
                </div>
                {{option}}
            </div>
        </div>
        <div class="sort-by subreddit-search" v-if="$router.currentRoute.name == 'search'">
            <div class="check" @click="checkCommunity = !checkCommunity; communitySearch();">
                <button class="btn">
                    <i class="far fa-check-square" v-if="checkCommunity"></i>
                    <i class="far fa-square" v-else></i>
                </button> Communities
            </div>
        </div>
        <div class="sort-by subreddit-search" v-if="$router.currentRoute.name == 'searchsub'">
            <div class="check" @click="allSearchCheck = !allSearchCheck; pushFilters();">
                all reddit results
                <button class="btn">
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            sort: "",
            sortList: [
                "hot",
                "relevance",
                "top",
                "controversial",
                "new",
                "rising",
                "comments"
            ],
            showList: false,
            checkCommunity: false,
            type: "sr",
            selectedSort: "",
            allSearchCheck: false
        };
    },
    methods: {
        pushFilters() {
            let vm = this;
            let routeName = vm.$router.currentRoute.name;
            let params = vm.$router.currentRoute.params;
            let query = {};
            if (vm.allSearchCheck) {
                routeName = "search";
            }
            if (routeName == "search") {
                query["sort"] = vm.selectedSort;
                query["type"] = vm.checkCommunity ? vm.type : null;
            } else if (routeName == "searchsub") {
                query["sort"] = vm.selectedSort;
            } else {
                params["sort"] = vm.selectedSort;
            }
            if (routeName) {
                vm.$router
                    .push({
                        name: routeName,
                        params,
                        query
                    })
                    .catch(err => {});
            }
        },
        addSort(sort) {
            let vm = this;
            vm.showList = false;
            vm.selectedSort = sort;
            vm.pushFilters();
        },
        sortFilter(sortList) {
            let vm = this;
            let routeName = vm.$router.currentRoute.name;
            let check = [];
            if (routeName == "search" || routeName == "searchsub") {
                check.push("relevance", "top", "new", "comments");
            } else if (routeName == "subreddit") {
                check.push("hot", "new", "controversial", "top", "rising");
            }
            return sortList.filter(function(el) {
                if (check.includes(el)) return el;
            });
        },
        sortIcon(option) {
            let vm = this;
            switch (option) {
                case "hot":
                    return "fas fa-fire";
                    break;
                case "relevance":
                    return "fas fa-project-diagram";
                    break;
                case "top":
                    return "fas fa-trophy";
                    break;
                case "controversial":
                    return "fas fa-bolt";
                    break;
                case "new":
                    return "fas fa-certificate";
                    break;
                case "rising":
                    return "fas fa-angle-double-up";
                    break;
                case "comments":
                    return "fas fa-comment-dots";
                    break;
            }
        },
        setData() {
            let vm = this;
            vm.showList = false;
            let routeName = vm.$router.currentRoute.name;
            if (routeName == "subreddit") {
                vm.sort = vm.$router.currentRoute.params.sort;
                vm.selectedSort = vm.$router.currentRoute.params.sort;
            } else if (routeName == "search") {
                vm.sort = vm.$router.currentRoute.query.sort;
                vm.selectedSort = vm.$router.currentRoute.query.sort;
                vm.checkCommunity = vm.$router.currentRoute.query.type
                    ? true
                    : false;
            } else if (routeName == "searchsub") {
                vm.sort = vm.$router.currentRoute.query.sort;
                vm.selectedSort = vm.$router.currentRoute.query.sort;
            }
        },
        communitySearch() {
            let vm = this;
            vm.pushFilters();
        }
    },
    created() {
        let vm = this;
        vm.setData();
        window.addEventListener("click", function(e) {
            // close dropdown when clicked outside
            if (!vm.$el.contains(e.target)) {
                vm.showList = false;
            }
        });
    },
    watch: {
        $route: "setData"
    },
    mounted() {
        this.setData();
    }
};
</script>
<style lang="scss" scoped>
.sort {
    background-color: #1a1a1b;
    height: 46px;
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.sort-by {
    color: #818384;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.5px;
    line-height: 12px;
    text-transform: uppercase;
}
.sort-by-option {
    margin-left: 8px;
    color: #d7dadc;
    text-transform: uppercase;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
}
.sort-by-option::after {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f0d7";
    background-color: transparent;
    color: #818384;
    margin-left: 10px;
}
.sort-by-option:hover {
    color: #f7f7f8;
}
.sort-by-option:hover:after {
    color: #d7dadc;
}
.sort-by-list {
    border: 1px solid #343536;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(215, 218, 220, 0.2);
    color: #d7dadc;
    overflow: hidden;
    background-color: #1a1a1b;
    position: absolute;
    z-index: 10;
    top: 32px;
    left: 72px;
    cursor: pointer;
}
.sort-options {
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    display: block;
    padding: 8px;
    text-transform: capitalize;
    white-space: nowrap;
    color: #818384;
    text-align: left;
}
.sort-options:hover {
    color: #d7dadc;
    fill: #d7dadc;
    background-color: #17232d;
    outline: none;
}
.sort-options.active {
    color: #d7dadc;
}
.option-icon {
    margin-right: 4px;
    color: #818384;
    float: left;
    width: 18px;
    text-align: center;
}
.option-icon.active {
    color: #536dfe !important;
}
.sort-options:hover > .option-icon {
    color: #d7dadc;
}
.subreddit-search {
    cursor: pointer;
    position: absolute;
    right: 0;
    margin-right: 15px;
}
.check > button > i {
    font-size: 18px;
}
.check > button:hover {
    background-color: #1a1a1b;
    color: inherit;
}
.check > button {
    margin: 0;
    padding: 0 5px;
    background-color: #1a1a1b;
}
</style>