<template>
    <div class="col-md-11">
        <template v-if="type=='heading'">
            <div class="card">
                <template v-if="header.banner_img">
                    <div class="view overlay">
                        <img class="card-img-top" :src="header.banner_img" alt="Card image cap" />
                    </div>
                </template>
                <div class="card-body">
                    <p class="card-title text-left font-weight-bold">
                        <template v-if="header.community_icon">
                            <img
                                :src="header.community_icon"
                                height="64"
                                style="margin-right:5px; margin-bottom:5px;"
                            />
                        </template>
                        <template v-else-if="header.header_img">
                            <img
                                :src="header.header_img"
                                height="64"
                                style="margin-right:5px; margin-bottom:5px;"
                            />
                        </template>
                        <template v-else-if="header.icon_img">
                            <img
                                :src="header.icon_img"
                                height="64"
                                style="margin-right:5px;margin-bottom:5px;"
                            />
                        </template>
                        {{header.display_name_prefixed}}
                        <small
                            class="text-muted"
                        >
                            <br />
                            <p
                                class="text-left html_text"
                                v-html="format(header.public_description_html,false)"
                                v-if="header.public_description_html"
                            ></p>
                            <template v-if="header.subscribers > 0">
                                <span style="margin-right: 5px">
                                    <i class="fab fa-battle-net" style="margin-right: 2px"></i>
                                    {{header.subscribers | commentCount}} Members &#9475;
                                </span>
                            </template>
                            <template v-if="header.active_user_count > 0">
                                <span style="margin-right: 5px">
                                    <i class="fas fa-globe" style="margin-right: 2px"></i>
                                    {{header.active_user_count | commentCount}} Online &#9475;
                                </span>
                            </template>
                            <span style="margin-right: 5px">
                                <i class="fas fa-birthday-cake" style="margin-right: 2px"></i>
                                {{header.created_utc | dateExact}} Cake Day
                            </span>
                        </small>
                    </p>
                </div>
            </div>
        </template>
        <template v-else-if="type=='community'">
            <div class="card">
                <div class="card-body">
                    <p class="card-title text-left font-weight-bold">
                        <router-link :to="'/'+tile.display_name_prefixed+'/hot/'">
                            <template v-if="tile.icon_img">
                                <img :src="tile.icon_img" height="32" style="margin-right:5px;" />
                            </template>
                            <template v-else-if="tile.community_icon">
                                <img
                                    :src="tile.community_icon"
                                    height="32"
                                    style="margin-right:5px;"
                                />
                            </template>
                            {{tile.title}}
                            <small
                                class="text-muted"
                                style="padding-left:10px;"
                            >{{tile.display_name_prefixed}}</small>
                        </router-link>
                    </p>
                    <template v-if="tile.public_description">
                        <div style="margin-top:10px;">
                            <p
                                class="text-left html_text"
                                v-html="format(tile.public_description_html,false)"
                            ></p>
                        </div>
                    </template>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="card">
                <div class="card-body">
                    <p class="card-title text-left font-weight-bold">
                        <router-link :to="tile.permalink" v-if="type=='list'">{{tile.title}}</router-link>
                        <template v-if="type=='detail'">
                            <span style="font-size:20px;">{{tile.title}}</span>
                        </template>
                        <small class="text-muted">
                            <br />
                            <router-link :to="'/'+tile.subreddit_name_prefixed+'/hot/'">
                                <template v-if="redditData.icon_img && type != 'heading'">
                                    <img
                                        :src="redditData.icon_img"
                                        height="16"
                                        style="margin-right:5px;"
                                    />
                                </template>
                                <template v-else-if="redditData.header_img && type != 'heading'">
                                    <img
                                        :src="redditData.header_img"
                                        height="16"
                                        style="margin-right:5px;"
                                    />
                                </template>
                                <template
                                    v-else-if="redditData.community_icon && type != 'heading'"
                                >
                                    <img
                                        :src="redditData.community_icon"
                                        height="16"
                                        style="margin-right:5px;"
                                    />
                                </template>
                                <template v-else-if="header.icon_img">
                                    <img
                                        :src="header.icon_img"
                                        height="16"
                                        style="margin-right:5px;"
                                    />
                                </template>
                                {{tile.subreddit_name_prefixed}}
                            </router-link>
                            &bull;
                            Posted by u/{{tile.author}} &bull; {{tile.created_utc | dateFromNow}}
                            <br />
                            <template v-if="tile.num_comments > 0">
                                <span style="margin-right: 5px">
                                    <i class="fas fa-comment-alt"></i>
                                    {{tile.num_comments | commentCount}} Comments
                                </span>
                            </template>
                            <template v-if="tile.total_awards_received > 0">
                                <span
                                    v-for="(award,index) in tile.all_awardings"
                                    :key="index"
                                    class="awards"
                                    style="margin-right: 5px"
                                >
                                    <img :src="award.icon_url" height="16" />
                                    <template v-if="award.count > 1">
                                        <span>{{award.count}}</span>
                                    </template>
                                </span>
                            </template>
                        </small>
                    </p>
                    <template v-if="type=='detail'">
                        <div style="margin-top:10px;">
                            <p
                                v-if="tile.selftext"
                                class="text-left html_text"
                                v-html="format(tile.selftext_html)"
                            ></p>
                            <img
                                v-if="tile.post_hint=='image'"
                                :src="tile.url"
                                :alt="tile.title"
                                class="img-fluid"
                            />
                            <div
                                v-if="tile.post_hint=='link'"
                                class="text-left"
                                style="font-size: 12px;"
                            >
                                <template v-if="tile.preview.reddit_video_preview">
                                    <div
                                        v-if="tile.preview.reddit_video_preview.fallback_url"
                                        class="embed-responsive embed-responsive-16by9"
                                    >
                                        <iframe
                                            :src="tile.preview.reddit_video_preview.fallback_url"
                                            :width="tile.preview.reddit_video_preview.width"
                                            :height="tile.preview.reddit_video_preview.height"
                                            scrolling="no"
                                            frameborder="0"
                                            allow="autoplay; fullscreen"
                                            allowfullscreen="true"
                                            class="embed-responsive-item"
                                        ></iframe>
                                    </div>
                                </template>
                                <template v-else>
                                    <a
                                        :href="tile.url"
                                        target="_blank"
                                        rel="external noopener noreferrer"
                                        class="detail-link"
                                    >
                                        <img
                                            v-if="tile.thumbnail"
                                            :src="tile.thumbnail"
                                            alt="tile.title"
                                            width="128"
                                            class="img-fluid rounded"
                                            style="padding-bottom: 8px;"
                                        />
                                        <template v-if="tile.thumbnail">
                                            <br />
                                        </template>
                                        {{tile.url | showLink}}
                                        <i
                                            class="fas fa-external-link-alt"
                                        ></i>
                                    </a>
                                </template>
                            </div>
                            <div v-if="tile.post_hint=='rich:video'">
                                <div
                                    v-if="tile.media_embed.content"
                                    v-html="format(tile.media_embed.content)"
                                ></div>
                            </div>
                            <div v-if="tile.post_hint=='hosted:video'">
                                <div
                                    v-if="tile.media.reddit_video.fallback_url"
                                    class="embed-responsive embed-responsive-16by9"
                                >
                                    <iframe
                                        :src="tile.media.reddit_video.fallback_url"
                                        :width="tile.media.reddit_video.width"
                                        :height="tile.media.reddit_video.height"
                                        scrolling="no"
                                        frameborder="0"
                                        allow="autoplay; fullscreen"
                                        allowfullscreen="true"
                                        class="embed-responsive-item"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import axios from "axios";
export default {
    props: ["tile", "type", "header"],
    data() {
        return {
            redditData: ""
        };
    },
    filters: {
        showLink: function(value) {
            if (!value) return "";
            value = value.replace("https://www.", "");
            value = value.replace("http://www.", "");
            if (value.length > 50) {
                value = value.substring(0, 50);
                value += "...";
            }
            return value;
        }
    },
    methods: {
        format(text, anchor = true) {
            text = text.replace("&lt;!-- SC_OFF --&gt;", "");
            text = text.replace("&lt;!-- SC_ON --&gt;", "");
            text = this.decodeHTML(text);
            if (anchor) {
                text = text.replace(
                    new RegExp("<a ", "g"),
                    "<a target='_blank'"
                );
            } else {
                text = text.replace(new RegExp("<a.*?>", "g"), "");
                text = text.replace(new RegExp("</a>", "g"), "");
            }
            return text;
        },
        decodeHTML(html) {
            var txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
        },
        fetchSub(sub) {
            let vm = this;
            axios
                .get("/" + sub + "/about.json")
                .then(res => {
                    if (!res.data.error) {
                        vm.redditData = res.data.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        if (!this.header && this.type != "community") {
            this.fetchSub(this.tile.subreddit_name_prefixed);
        }
    }
};
</script>
<style lang="scss">
.card {
    margin-bottom: 10px;
    // box-shadow: 0 2px 5px 0 rgb(0, 16, 255), 0 2px 10px 0 rgb(0, 44, 255);
    border: 1px solid #343536;
    background-color: #1a1a1b;
}
.card:hover {
    // margin-bottom: 10px;
    // box-shadow: 0 2px 5px 0 rgb(0, 16, 255), 0 2px 10px 0 rgb(0, 44, 255);
    border: 1px solid #818384;
}
.card-title {
    margin-bottom: 0;
}
.card-title,
.card-title a {
    color: #d7dadc;
}
.awards * {
    margin-right: 2px;
}
.html_text * {
    font-size: 15px;
}
.html_text p {
    color: #d7dadc;
    margin-bottom: 0px;
}
.html_text {
    margin-bottom: 0px;
}
.html_text a {
    color: #4fbcff;
    text-decoration: underline;
}
.html_text table {
    border: 2px solid #eee;
    border-collapse: collapse;
    display: inline-block;
    margin-bottom: 4px;
    margin-top: 4px;
    overflow-x: auto;
    word-break: normal;
}
.html_text td,
.html_text th {
    border: 1px solid #eee;
    padding: 4px 8px;
}
a {
    cursor: pointer;
}
.detail-link {
    color: #4193c6;
}
.detail-link:hover {
    color: #4193c6;
    text-decoration: underline;
}
</style>