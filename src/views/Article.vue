<template>
	<div class="blog page">
		<MSectionHeader class="header" title="Article" />
		<div class="blog__container">
			<div class="blog__container--articles">
				<div class="services__details--info">
	        <h2>{{ $t(article.title) }}</h2>
	        <div v-for="(data, i) in orderedContent" :key="i" class="menuData">
	          <h4 v-if="data.type == 'subtitle'">{{ $t(data.content) }}</h4>
	          <p v-if="data.type == 'description'">{{ $t(data.content) }}</p>
	          <ul v-if="data.type == 'list'">
							<li v-for="(item, j) in getList(data.content)" :key="j">
								{{ $t(item) }}
							</li>
	          </ul>
	          <div v-if="data.type == 'image'" class="dataImage">
							<img :src="getImage(data.content)">
	          </div>
	          <span v-if="data.type == 'note'">{{ $t(data.content) }}</span>
	        </div>
	      </div>
	      <div class="comments">
	      	<p class="comments__title">{{ `${article.commentsCount} Comments` }}</p>
	      	<div class="comments__container">
	      		<template v-if="article.commentsCount">
		      		<div v-for="(comment, j) in comments" :key="j" class="comment">
		      			<div class="comment__block">
		      				<div>
					      		<h4>{{ comment.name }}</h4>
					      		<span>{{ getDate(comment.createdAt) }}</span>
					      		<p>{{ comment.content }}</p>
					      	</div>
				      		<div class="comment__action--container">
				      		<span
				      			class="comment__action"
				      			@click="replyComment = comment"
				      		>
				      			{{ $t('Reply') }}
				      		</span>
				      		<span
				      			v-if="comment.answers"
				      			class="comment__action"
				      			@click="fetchReplies(comment._id)"
				      		>
				      			{{ `View ${comment.answers} replies` }}
				      		</span>
				      	</div>
				      	</div>
				      	<div class="replies" v-if="comment.replies">
				      		<div v-for="(reply, k) in comment.replies" :key="k" class="comment">
				      			<div class="comment__block">
						      		<h4>{{ reply.name }}</h4>
						      		<span>{{ getDate(reply.createdAt) }}</span>
						      		<p>{{ reply.content }}</p>
						      	</div>
				      		</div>
				      	</div>
		      		</div>
		      	</template>
	      	</div>
	      	<div class="comments__form">
	      		<p class="comments__title">
	      			{{ replyComment ? `Reply to ${replyComment.name}` : $t('Post your Comment') }}
	      		</p>
	      		<div class="comments__form--container">
	      			<input
	      				v-model="newComment.name"
	      				class="comments__form--input comments__form--input-half"
	      				type="text"
	      				name="full-name"
	      				:placeholder="$t('Full Name')"
	      			>
	      			<input
	      				v-model="newComment.email"
	      				class="comments__form--input comments__form--input-half"
	      				type="email"
	      				name="email"
	      				:placeholder="$t('Email')"
	      			>
	      		</div>
	      		<div class="comments__form--container">
		      		<input
	      				v-model="newComment.content"
	      				class="comments__form--input comments__form--input-full"
	      				type="text"
	      				name="comment"
	      				:placeholder="$t('Comment')"
	      			>
	      		</div>
	      		<div class="flexActions">
		      		<button class="comments__form--button" @click="postComment">
		      			{{ replyComment ? $t('Reply') : $t('Post Comment') }}
		      		</button>
		      		<span v-if="replyComment" @click="replyComment = undefined">{{ $t('Cancel') }}</span>
		      	</div>
	      	</div>
	      </div>
			</div>
			<div class="blog__container--panel desktop-only">
				<div class="section">
					<div class="section__title">
						<h4>{{ $t('Recent Posts') }}</h4>
					</div>
					<router-link
        		v-for="(article, i) in recentPosts"
        		:key="i"
        		:to="`/${$i18n.locale}/blog/${article.slug}`"
        		class="recentPost__link"
        	>
						<MRelatedArticle
							:article="article"
							class="recentPost"
						/>
					</router-link>
				</div>
				<div class="section">
					<div class="section__title">
						<h4>{{ $t('Categories') }}</h4>
					</div>
					<div class="section__content">
						<div
							class="category"
							:class="{'category__active': $route.query.category == allCategory.name}"
							@click="getCategoryArticles(allCategory.name)"
						>
							<span>{{ allCategory.name }}</span>
							<span>{{ `(${totalArticles})` }}</span>
						</div>
						<div
							v-for="(category, i) in categories"
							:key="i"
							class="category"
							:class="{'category__active': $route.query.category == category.slug}"
							@click="getCategoryArticles(category.slug)"
						>
							<span>{{ category.name }}</span>
							<span>{{ `(${category.articleCount})` }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import MRelatedArticle from '@/components/molecules/m-related-article'
import MSectionHeader from '@/components/molecules/m-section-header'
import config from '../store/resources/endpoints/auth.json'

export default {
	components: {
		MRelatedArticle,
		MSectionHeader
	},
	data () {
		return {
			queryConfiguration: {
				currentPage: 1,
				pageLimit: 6
			},
			allCategory: {
				name: 'All'
			},
			recentPosts: [],
			newComment: {
				name: '',
				email: '',
				content: ''
			},
			replyComment: undefined,
			refreshKey: 0
		}
	},
	async mounted () {
		await this.fetchArticle(this.$route.params.slug)
		await this.fetchComments({ type: 'article', content: this.$route.params.slug })
		await this.fetchCategories()
		await this.fetchArticles({
			page: this.queryConfiguration.currentPage,
			category: 'All'
		})
		await this.getRecentPosts()
	},
	watch: {
		$route: {
      immediate: true,
      async handler (to, from) {
        if (to.params.slug) {
          await this.fetchArticle(to.params.slug)
        }
      }
    }
	},
	computed: {
		...mapGetters({
			categories: 'getCategories',
			article: 'getCurrentArticle',
			articles: 'getArticles',
			totalPages: 'totalPages',
			currentPage: 'currentPage',
			getComments: 'getComments'
		}),
		comments () {
			this.refreshKey
			return this.getComments
		},
		totalArticles () {
			let total = 0
			this.categories.forEach(category => total = total + category.articleCount)
			return total
		},
		orderedContent () {
			return [...this.article.content].sort((a, b) => { return a.position - b.position })
		}
	},
	methods: {
		...mapActions({
			fetchCategories: 'fetchCategories',
			fetchArticle: 'fetchArticle',
			fetchArticles: 'fetchArticles',
			fetchComments: 'fetchComments',
			addComment: 'addComment'
		}),
		async getRecentPosts () {
			this.recentPosts = this.articles.slice(0,3);
		},
		getCategoryArticles (slug) {
			this.$router.push({
				name: 'Blog',
				query: {
					category: slug,
					page: 1
				}
			})
		},
		getImage (path) {
			return config.api + path
		},
		getList (list) {
			return list.split(',')
		},
		getDate (date) {
			const inputDate = new Date(date)
			const options = {
			  day: "2-digit",
			  month: "short",
			  year: "numeric",
			  hour: "2-digit",
			  minute: "2-digit",
			  hour12: false,
			};
			return new Intl.DateTimeFormat("ro-RO", options).format(inputDate);
		},
		postComment () {
			const comment = this.replyComment
			? {
				name: this.newComment.name,
				email: this.newComment.email,
				content: this.newComment.content,
				parent: this.replyComment._id
			}
			: {
				name: this.newComment.name,
				email: this.newComment.email,
				content: this.newComment.content,
				article: this.article.slug,
			}
			this.addComment(comment)
			this.newComment = {
				name: '',
				email: '',
				content: ''
			}
		},
		async fetchReplies (parent) {
			await this.fetchComments({ type: 'parent', content: parent })
			this.refreshKey++
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.blog {
	background: var(--c-light);
	padding: 96px var(--spacer-xl);
	@include for-mobile {
		padding: 84px 0 0;
	}
	&__container {
		margin: 0 auto;
		max-width: 1272px;
		display: flex;
		&--articles {
			flex: 1 1 70%;
			// display: flex;
			// flex-wrap: wrap;
		}
		&--panel {
			margin: var(--spacer-sm) 0 var(--spacer-sm) var(--spacer-lg);
			flex: 1 1 calc(30% - 2rem);
			position: sticky;
			top: calc(96px + 1rem);
    	height: 35rem;
		}
	}
}
.articles {
	// display: flex;
	// flex-wrap: wrap;

	&__article {
		padding: var(--spacer-sm);
		min-height: 12rem;
		margin: var(--spacer-sm) 0;
			background: var(--c-white);
		// flex: 1 1 calc(50% - 2rem);
		// max-width: calc(50% - 2rem);
	}
	&__pagination {
		justify-content: center;
    margin: var(--spacer-xl) 0 0;
	}
}
.section {
	&__title {
		h4 {
			margin: 0 0 var(--spacer-sm);
	    font-family: var(--font-family-secondary);
	    font-weight: var(--font-bold);
	    font-size: var(--font-lg);
	    border-bottom: 2px solid var(--c-primary);
	    padding: 0 0 var(--spacer-xs);
		}
	}
}
.category {
	display: flex;
	justify-content: space-between;
	margin: var(--spacer-base) 0;
	opacity: .5;
	cursor: pointer;
	transition: .3s ease;
	&:hover {
		opacity: 1;
	}
	&__active {
		opacity: 1;
	}
	span {
		font-size: var(--font-xs);
		color: var(--c-text);
		font-family: var(--font-family-secondary);
		font-weight: var(--font-semibold);
	}
}
.recentPost {
	margin: var(--spacer-xs) 0;
	&__link {
		color: var(--c-text);
		text-decoration: none;
	}
}
.header {
	max-width: 1272px;
	margin: var(--spacer-2xl) var(--spacer-sm) 0;
	&::v-deep .title {
		margin: 0;
		font-size: 2.5rem;
	}
	&::v-deep .a-divider {
		margin: var(--spacer-xl) 0;
	}
	&::v-deep .description {
		margin: 0;
	}
}
.services {
  display: flex;
  // align-items: center;
  justify-content: space-between;
  position: relative;
  max-width: 1272px;
  margin-top: var(--spacer-2xl);
  &__list {
    background: var(--c-light);
    padding: var(--spacer-lg) var(--spacer-lg) var(--spacer-2xl);
    border-radius: 25px;
    width: 35%;
    min-height: 34rem;
    &--title {
      display: flex;
      align-items: center;
      padding: var(--spacer-sm) 0 var(--spacer-lg);

      &-icon {
        position: relative;
        width: 2.25rem;
        height: 2.25rem;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          object-fit:cover;
          filter: invert(38%) sepia(66%) saturate(3288%) hue-rotate(181deg) brightness(87%) contrast(100%);
        }
      }
      h3 {
        margin: 0 var(--spacer-base);
        font-family: var(--font-family-primary);
        letter-spacing: .5px;
        font-size: var(--font-lg);
        font-weight: var(--font-medium);
      }
    }
    &--content {
      &-item {
        display: flex;
        align-items: center;
        padding: var(--spacer-sm) 0;
        cursor: pointer;
        &_active {
          color: var(--c-primary);
        }
        &:hover {
          text-decoration: underline;
          color: var(--c-primary);
          .list-item__icon {
            transform: scale(1.07);
          }
        }
        span {
          display: block;
          font-family: var(--font-family-secondary);
          font-weight: var(--font-medium);
          margin-left: var(--spacer-base);
        }
      }
    }
  }
  &__details {
    width: 55%;
    height: calc(90vh - 96px);
    border-radius: 25px;
    top: calc(96px + 5vh);
    &--items {
      display: flex;
      flex-wrap: wrap;
      &-card {
        display: flex;
        height: 12rem;
        flex: 1 1 calc(50% - 3rem);
        background: var(--c-light);
        margin: var(--spacer-xs);
        border-radius: 20px;
        padding: var(--spacer-sm);
      }
    }
    &--info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: var(--c-white);
      padding: var(--spacer-2xl);
      text-align: left;
      @include for-mobile {
      	padding: var(--spacer-sm);
      }
      h2 {
        margin-top: 0;
        font-family: var(--font-family-primary);
        font-weight: var(--font-bold);
        font-size: var(--font-xl);
      }
      p {
        font-family: var(--font-family-secondary);
        font-size: var(--font-xs);
        font-weight: var(--font-medium);
        line-height: 1.6;
      }
      &::-webkit-scrollbar {
				width: .35rem;
      }
      &::-webkit-scrollbar-track {
				background: var(--c-light-darken);
      }
      &::-webkit-scrollbar-thumb {
				background: var(--c-gray-lighten);
      }
    }
  }

  .list-item {
    &__icon {
      transition: .3s ease;
      position: relative;
      width: 2.25rem;
      height: 2.25rem;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        object-fit:cover;
        filter: invert(38%) sepia(66%) saturate(3288%) hue-rotate(181deg) brightness(87%) contrast(100%);
      }
    }
  }
  .service-card {
    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 2.75rem;
      height: 2.75rem;
      margin-right: var(--spacer-sm);
      background: var(--c-primary);
      border-radius: 50%;
      img {
        width: 50%;
        height: 50%;
        object-fit:cover;
        filter: invert(1);
      }
    }
    &__content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1 1 80%;
      text-align: left;
      &--title {
        display: flex;
        height: 2.75rem;
        h4 {
          margin: 0;
          font-family: var(--font-family-secondary);
          font-weight: var(--font-bold);
          align-self: center;
        }
      }
      p {
        font-family: var(--font-family-secondary);
        font-size: var(--font-xs);
        font-weight: var(--font-medium);
        line-height: 1.6;
        max-width: 90%;
      }
      &--action {
        display: flex;
        align-items: center;
        background: transparent;
        margin: var(--spacer-sm) 0;
        border: 0;
        padding: 0;
        font-family: var(--font-family-primary);
        font-weight: var(--font-medium);
        color: var(--c-primary);
        cursor: pointer;
        &:hover {
          text-decoration: underline;
          img {
            transform: translateX(10px);
          }
        }
        &-icon {
          position: relative;
          width: 1rem;
          height: 1rem;
          img {
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            object-fit:cover;
            margin-left: var(--spacer-xs);
            transition: .3s ease;
            filter: invert(38%) sepia(66%) saturate(3288%) hue-rotate(181deg) brightness(87%) contrast(100%);
          }
        }
      }
    }
  }
}
.dataImage {
	position: relative;
	width: 100%;
	height: 12rem;
  margin: var(--spacer-xs) 0;
	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
.menuData {
	// margin: var(--spacer-xs) 0;
	h4 {
		font-family: var(--font-family-secondary);
		font-size: var(--font-lg);
		margin: var(--spacer-xs) 0;
	}
	p {
		margin: 0;
		font-size: .8rem;
		font-weight: var(--font-normal);
		margin: var(--spacer-xs) 0;
	}
	ul {
		padding: 0 var(--spacer-sm);
		margin: var(--spacer-xs) 0;
		li {
			font-family: var(--font-family-secondary);
			font-size: .8rem;
			padding: var(--spacer-2xs) 0;
			list-style-type: disc;
		}
	}
	span {
    display: block;
    margin: var(--spacer-sm) 0;
    padding: 0.75rem var(--spacer-sm);
    border-left: 4px solid var(--c-primary);
		font-family: var(--font-family-secondary);
    font-size: .8rem;
	}
}
.comments {
	padding: var(--spacer-2xl);
	margin: var(--spacer-2xs) 0;
	background: var(--c-white);
  font-family: var(--font-family-secondary);
  @include for-mobile {
  	padding: var(--spacer-sm) var(--spacer-sm) var(--spacer-lg);
  	width: calc(100% - 2rem);
  	// margin-bottom: var(--spacer-sm);
  }

	&__title {
    font-weight: var(--font-bold);
    font-size: var(--font-lg);
		margin: 0 0 var(--spacer-xs);
	}
	&__form {
		margin: var(--spacer-2xl) 0 0;
		&--container {
			display: flex;
			width: 100%;
			@include for-mobile {
				flex-wrap: wrap;
			}
		}
		&--input {
			display: block;
			outline: none;
	    font-size: var(--font-sm);
	    font-family: var(--font-family-secondary);
	    padding: .75rem var(--spacer-sm);
	    border: 2px solid var(--c-light-darken);
	    margin: var(--spacer-xs) 0;
	    transition: .3s ease;
	    &:focus {
	    	border-color: var(--c-primary);
	    }
	    &-half {
	    	@include for-mobile {
	    		flex: 1 1 calc(50% - 2.5rem - 4px);
    			max-width: calc(50% - 2.5rem - 4px);
	    	}
	    	flex: 1 1 calc(50% - 1rem);
	    	max-width: calc(50% - 1rem);
	    	&:first-child {
	    		margin-right: var(--spacer-xs);
	    	}
	    	&:last-child {
	    		margin-left: var(--spacer-xs);
	    	}
	    }
	    &-full {
	    	flex: 1 1 100%;
	    	width: 100%;
	    }
		}
		&--button {
			background: var(--c-primary);
	    outline: none;
	    border: none;
	    border-radius: 50px;
	    color: var(--c-white);
	    padding: .75rem var(--spacer-lg);
	    font-family: var(--font-family-secondary);
	    font-weight: var(--font-medium);
	    font-size: var(--font-sm);
	    margin-top: var(--spacer-xs);
	    cursor: pointer;
	    transition: .3s ease;

	    &:hover {
	    	background: var(--c-primary-darken);
	    }
	    &:focus {
	    	background: var(--c-primary-darken);
	    }
		}
	}
}
.comment {
	margin: var(--spacer-xs) 0;
	&__block {
		border-radius: 15px;
		padding: var(--spacer-xs) var(--spacer-sm);
		background: var(--c-light);
	}
	&__action {
		&--container {
			display: flex;
		}
		&:not(:first-child) {
			margin: 0 var(--spacer-sm);
		}
		min-width: 2rem;
		bottom: -.9rem;
		left: var(--spacer-sm);
		color: var(--c-text) !important;
		font-family: var(--font-family-primary);
		font-weight: var(--font-medium) !important;
		font-size: var(--font-xs) !important;
		line-height: 1 !important;
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
	h4 {
		margin: 0;
	  font-size: var(--font-xs);
	  font-weight: var(--font-bold);
	  line-height: 1.2
	}
	span {
    display: block;
		font-size: var(--font-xs);
    text-transform: capitalize;
    color: var(--c-gray-lighten);
    font-weight: var(--font-medium);
    line-height: 1;
	}
	p {
		margin: .75rem 0;
    font-size: var(--font-sm);
	}
}
.flexActions {
	display: flex;
	align-items: center;
	span {
		margin-left: var(--spacer-base);
		color: var(--c-gray);
		font-family: var(--font-family-secondary);
		font-size: var(--font-sm);
		margin-top: var(--spacer-xs);
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
}
.replies {
	margin-left: var(--spacer-xl);
	p {
		margin: 0.5rem 0 0 !important;
		font-size: var(--font-xs) !important;
	}
	span {
		font-size: var(--font-2xs) !important;
	}
}
</style>