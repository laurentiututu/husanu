<template>
	<div class="blog page">
		<MSectionHeader class="header" title="Blog" />
		<div class="blog__container">
			<div class="blog__container--panel mobile-only">
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
			<div class="blog__container--articles">
				<transition-group
          appear
          name="products__slide"
          tag="div"
          class="articles"
        >
        	<router-link
        		v-for="(article, i) in articles"
        		:key="i"
        		:to="`/${$i18n.locale}/blog/${article.slug}`"
        		class="articles__article--link"
        	>
						<MArticleCard
							:article="article"
							class="articles__article"
						/>
					</router-link>
				</transition-group>
				<SfPagination
          v-if="totalPages > 1"
          class="articles__pagination"
          :current="currentPage"
          :total="totalPages"
          :visible="3"
        />
			</div>
			<div class="blog__container--panel mobileSpacer">
				<div class="section">
					<div class="section__title">
						<h4>{{ $t('Recent Posts') }}</h4>
					</div>
					<router-link
        		v-for="(article, i) in recentPosts"
        		:key="i"
        		:to="`/${$i18n.locale}/blog/${article.slug}`"
        		class="articles__article--link"
        	>
						<MRelatedArticle
							:article="article"
							class="recentPost"
						/>
					</router-link>
				</div>
				<div class="section desktop-only">
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
import { SfPagination } from '@storefront-ui/vue'
import MArticleCard from '@/components/molecules/m-article-card'
import MRelatedArticle from '@/components/molecules/m-related-article'
import MSectionHeader from '@/components/molecules/m-section-header'

export default {
	metaInfo: {
		title: 'Blog'
	},
	components: {
		SfPagination,
		MArticleCard,
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
			recentPosts: []
		}
	},
	async mounted () {
		await this.fetchArticles({
			page: this.queryConfiguration.currentPage,
			category: 'All'
		})
		await this.fetchCategories()
		await this.getRecentPosts()
	},
	watch: {
		$route: {
      immediate: true,
      async handler (to, from) {
        if (to.query.page || to.query.category) {
          await this.fetchArticles({
          	page: parseInt(to.query.page) || 1,
          	category: this.$route.query.category || 'All'
          });
        }
      }
    }
	},
	computed: {
		...mapGetters({
			categories: 'getCategories',
			articles: 'getArticles',
			totalPages: 'totalPages',
			currentPage: 'currentPage'
		}),
		totalArticles () {
			let total = 0
			this.categories.forEach(category => total = total + category.articleCount)
			return total
		}
	},
	methods: {
		...mapActions({
			fetchCategories: 'fetchCategories',
			fetchArticles: 'fetchArticles'
		}),
		async getRecentPosts () {
			this.recentPosts = this.articles.slice(0,3);
		},
		getCategoryArticles (slug) {
			console.log(this.totalPages)
			this.$router.push({
				query: {
					category: slug,
					page: 1
				}
			})
		},
		viewPost (slug) {
			console.log(slug)
			// this.$router.push(slug)
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
		padding: 84px var(--spacer-sm) 0;
	}
	&__container {
		@include for-mobile {
			flex-direction: column;
		}
		margin: 0 auto;
		max-width: 1272px;
		display: flex;
		&--articles {
			@include for-mobile {
				flex: 1 1 100%;
			}
			flex: 1 1 70%;
			// display: flex;
			// flex-wrap: wrap;
		}
		&--panel {
			@include for-mobile {
				position: static;
				margin: var(--spacer-sm) 0;
			}
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
		&--link {
			color: var(--c-text);
			text-decoration: none;
		}
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
}
.header {
	max-width: 1272px;
	margin: var(--spacer-2xl) auto 0;
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
.mobileSpacer {
	@include for-mobile {
		margin-top: var(--spacer-2xl);
	}
}
</style>