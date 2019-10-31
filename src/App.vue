<template>
    <div id="app" class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <router-link to="/r/popular/hot">
                    <h1 class="title text-left">
                        <i class="fab fa-reddit-alien reddit-logo" id="reddit"></i>
                        <p class="reddit-logo-text">
                            <span>redd</span>
                            <span style="color:#FF4500">i</span>
                            <span>t</span>
                        </p>
                    </h1>
                </router-link>
            </div>
            <div class="col-md-12">
                <div class="md-form">
                    <input
                        type="text"
                        id="form1"
                        class="form-control"
                        v-model="searchInput"
                        @keyup.enter="searchSubmit"
                    />
                    <div class="options">
                        <router-link to="/r/popular/hot">
                            <div
                                class="icon-options"
                                data-toggle="tooltip"
                                title="Popular"
                                data-placement="bottom"
                            >
                                <i class="fas fa-trophy"></i>
                            </div>
                        </router-link>
                        <router-link to="/r/all/hot">
                            <div
                                class="icon-options"
                                data-toggle="tooltip"
                                title="All"
                                data-placement="bottom"
                            >
                                <i class="fas fa-globe"></i>
                            </div>
                        </router-link>
                    </div>
                    <label for="form1" id="search-label">
                        <i class="fas fa-search"></i>
                        {{searchPage}}
                    </label>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            searchInput: "",
            searchPage: "Search Reddit"
        };
    },
    methods: {
        searchSubmit() {
            let vm = this;
            if (vm.searchInput != "") {
                if (vm.searchPage.includes("r/")) {
                    vm.$router
                        .push({
                            name: "searchsub",
                            params: {
                                subreddit:
                                    vm.$router.currentRoute.params.subreddit,
                                searchString: vm.searchInput
                            },
                            query: {
                                sort: "relevance"
                            }
                        })
                        .catch(err => {});
                } else {
                    vm.$router
                        .push({
                            name: "search",
                            params: {
                                searchString: vm.searchInput
                            },
                            query: {
                                sort: "relevance"
                            }
                        })
                        .catch(err => {});
                }
            }
        }
    },
    created() {
        let vm = this;
        vm.$router.push({
            name: "subreddit",
            params: {
                subreddit: "popular",
                sort: "hot"
            }
        });
    },
    watch: {
        $route: function() {
            let vm = this;
            let routeName = vm.$router.currentRoute.name;
            if (routeName == "search" || routeName == "searchsub") {
                vm.searchInput = vm.$router.currentRoute.params.searchString;
                $("#search-label").add("active");
                if (routeName == "searchsub") {
                    vm.searchPage =
                        "Search r/" + vm.$router.currentRoute.params.subreddit;
                } else {
                    vm.searchPage = "Search Reddit";
                }
            } else if (
                routeName != "search" &&
                (vm.$router.currentRoute.params.subreddit != "popular" &&
                    vm.$router.currentRoute.params.subreddit != "all")
            ) {
                vm.searchInput = "";
                $("#search-label").removeClass("active");
                vm.searchPage =
                    "Search r/" + vm.$router.currentRoute.params.subreddit;
            } else if (routeName != "search" && routeName != "searchsub") {
                vm.searchInput = "";
                $("#search-label").removeClass("active");
                vm.searchPage = "Search Reddit";
            } else {
                vm.searchPage = "Search Reddit";
            }
        }
    }
};
</script>
<style lang="scss">
body {
    background-color: black;
    color: white;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    // color: #2c3e50;
    padding: 30px;
}
#form1:focus {
    color: #bfc2c4;
}
#form1 {
    border-bottom: 1px solid #757575;
    color: #bfc2c4;
    width: 90%;
    padding-right: 10%;
}
.title,
.options {
    color: #d7dadc;
    cursor: pointer;
}
.options {
    position: absolute;
    top: -2px;
    right: 0px;
}
.icon-options {
    padding: 8px;
    font-size: 25px;
    float: left;
    color: #d7dadc;
    border-radius: 2px;
    outline: none;
}
.icon-options:hover {
    background-color: rgba(215, 218, 220, 0.1);
}
.reddit-logo {
    color: #ffffff;
    background-color: #ff4500;
    padding: 4px;
    border-radius: 23px;
    float: left;
}
.reddit-logo-text {
    padding-left: 5px;
    float: left;
}
.md-form label.active {
    color: #536dfe;
}
* {
    -webkit-tap-highlight-color: transparent;
}
</style>
