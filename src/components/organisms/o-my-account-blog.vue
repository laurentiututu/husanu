<template>
	<SfTabs>
		<SfTab :title="$t('Posts')">
			<div class="postCategories">
				<span
					:class="{'postCategories__active': activeCategory == 'New'}"
					@click="setActiveCategory({name: 'New'})"
				>
					<img src="@/assets/icons/add.png">
				</span>
				<span
					:class="{'postCategories__active': activeCategory == 'All'}"
					@click="setActiveCategory({name: 'All'})"
				>
					{{ `All (${totalArticles})` }}
				</span>
				<template v-for="(category, i) in categories">
					<span
						v-if="category.active"
						:key="i"
						:class="{'postCategories__active': activeCategory == category.name}"
						@click="setActiveCategory(category)"
					>
						{{ `${category.name} (${category.articleCount})` }}
					</span>
				</template>
			</div>
			<div v-if="activeCategory !== 'New'">
				<transition-group
          appear
          name="products__slide"
          tag="div"
          class="articles"
        >
					<MArticleCard
						v-for="(article, i) in articles"
						:key="i"
						:article="article"
						:edit="true"
						class="articles__article"
					/>
				</transition-group>
				<SfPagination
          v-if="totalPages > 1"
          class="articles__pagination"
          :current="currentPage"
          :total="totalPages"
          :visible="3"
        />
			</div>
			<div v-if="activeCategory == 'New'" class="new">
				<MArticleForm @post="setActiveCategory" />
			</div>
		</SfTab>
		<SfTab class="categories" :title="$t('Categories')">
			<MCategoryList :categories="categories" />
		</SfTab>
		<SfTab :title="$t('Comments')">
			<MCommentsAdmin />
		</SfTab>
	</SfTabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { SfTabs, SfPagination } from '@storefront-ui/vue'
import MCategoryList from '@/components/molecules/m-category-list'
import MArticleForm from '@/components/molecules/m-article-form'
import MArticleCard from '@/components/molecules/m-article-card'
import MCommentsAdmin from '@/components/molecules/m-comments-admin'
import config from '../../store/resources/endpoints/auth.json'

export default {
	// todo:
	// My Account / Booking System / Blog section / Mobile view
	components: {
		SfTabs,
		SfPagination,
		MCategoryList,
		MArticleForm,
		MArticleCard,
		MCommentsAdmin
	},
	data () {
		return {
			contentType: {
				active: '',
				list: [
					'Subtitle',
					'Description',
					'List',
					'Image',
					'Note'
				]
			},
			activeCategory: 'All',
			currentCategory: {},
			newPost: {
				title: '',
				category: '',
				readTime: null,
				content: []
			},
			queryConfiguration: {
				currentPage: 1,
				pageLimit: 6
			}
		}
	},
	async mounted () {
		await this.fetchCategoriesAdmin()
		await this.fetchArticlesAdmin({
			page: this.queryConfiguration.currentPage,
			category: this.activeCategory == this.currentCategory.name ? this.currentCategory.id : 'All'
		})
	},
	watch: {
		$route: {
      immediate: true,
      handler (to, from) {
        if (to.query.page) {
          this.fetchArticlesAdmin({
          	page: parseInt(to.query.page) || 1,
          	category: this.activeCategory == this.currentCategory.name ? this.currentCategory.id : 'All'
          });
        }
      }
    }
	},
	computed: {
		...mapGetters({
			categories: 'getCategoriesAdmin',
			articles: 'getArticlesAdmin',
			totalPages: 'totalPages',
			currentPage: 'currentPage'
		}),
		activeCategories () {
			let categories = []
			this.categories.forEach(category => { if (category.active) {categories.push(category)} })
			return categories
		},
		totalArticles () {
			let total = 0
			this.categories.forEach(category => total = total + category.articleCount)
			return total
		}
	},
	methods: {
		...mapActions({
			fetchCategoriesAdmin: 'fetchCategoriesAdmin',
			fetchArticlesAdmin: 'fetchArticlesAdmin'
		}),
		setActiveCategory (category) {
			if (this.activeCategory !== category.name) {
				this.activeCategory = category.name

				if (category.name !== 'All') {
					this.currentCategory = category
          this.fetchArticlesAdmin({ page: 1, category: category.id });
          this.$router.push({ query: { page: 1}})
				} else {
          this.fetchArticlesAdmin({ page: 1, category: this.activeCategory });
          this.$router.push({ query: { page: 1}})
				}
			}
		}
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.postCategories {
	display: flex;
	flex-wrap: wrap;
	border-bottom: 1px solid var(--c-primary-darken);
	span {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacer-2xs) var(--spacer-sm);
		background: var(--c-primary);
		border: 1px solid var(--c-primary-darken);
		color: var(--c-white);
		font-size: var(--font-sm);
		cursor: pointer;
		user-select: none;
		transition: .3s ease;
		&:hover {
			background: var(--c-primary-darken);
		}
		img {
			width: 1rem;
			height: 1rem;
			filter: invert(1);
		}
	}
	&__active {
		background: var(--c-primary-darken) !important;
	}
}
.articles {
	display: flex;
	flex-wrap: wrap;

	&__article {
		padding: var(--spacer-sm);
		flex: 1 1 calc(50% - 2rem);
		max-width: calc(50% - 2rem);
		@include for-mobile {
			padding: var(--spacer-sm) 0;
			flex: 1 1 100%;
			max-width: 100%;
		}
	}
	&__pagination {
		justify-content: center;
    margin: var(--spacer-xl) 0 0;
	}
}
</style>