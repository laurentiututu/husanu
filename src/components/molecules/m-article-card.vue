<template>
	<div class="m-article-card">
		<div class="image__container">

			<img :src="article.cover ? getImage(article.cover.filePath) : require(`@/assets/images/articles/1.jpg`)" class="image">
		</div>
		<div class="info">
			<div class="info__basic">
				<div class="info__basic--date">
					<div>
						<span>{{ getDateDay }}</span>
						<span>{{ getDateMonth }}</span>
					</div>
					<span class="info__basic--date-year">{{ getDateYear }}</span>
				</div>
				<div class="info__basic--title">
					<!-- <p>{{ article.category.name }}</p> -->
					<h1>{{ article.title }}</h1>
					<div class="info__basic--details">
						<div class="info__basic--details-block">
							<img src="@/assets/icons/clock.png">
							<span>{{ `${article.readTime} min` }}</span>
						</div>
						<div class="info__basic--details-block">
							<img src="@/assets/icons/chat.png">
							<span>{{ article.commentsCount }}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="info__description">
				<p>{{ article.description }}</p>
			</div>
			<button class="info__action--content-action">
        <span>{{ $t('Read More') }}</span>
        <div class="info__action--content-action-icon">
          <img src="@/assets/icons/right-arrow.png">
        </div>
      </button>
      <div v-if="edit" class="action">
      	<!-- <button class="action__button action__button--edit">{{ $t('Edit') }}</button> -->
      	<button class="action__button action__button--delete" @click="deletePost(article._id)">{{ $t('Delete') }}</button>
      </div>
		</div>
	</div>
</template>
<script>
import { mapActions } from 'vuex'
import config from '../../store/resources/endpoints/auth.json'

export default {
	props: {
		article: {
			type: Object,
			default: () => ({})
		},
		edit: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		getDateDay () {
			const date = new Date(this.article.updatedAt);
			const day = date.getDate();

			return day;
		},
		getDateMonth () {
			const date = new Date(this.article.updatedAt);
			const month = date.getMonth();

			const monthNames = [
			  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
			  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
			];

			return monthNames[month];
		},
		getDateYear () {
			const date = new Date(this.article.updatedAt);
			const year = date.getFullYear();

			return year;
		}
	},
	methods: {
		...mapActions({
			deletePost: 'removeArticle'
		}),
		getImage (path) {
			return config.api + path
		},
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.m-article-card {
	display: flex;
	position: relative;
	font-family: var(--font-family-secondary);
	cursor: pointer;
	user-select: none;
	transition: .3s ease;
	&:hover {
		box-shadow: 0px 0px 25px -20px rgba(0,0,0,0.75);

		.info__action--content-action {
			opacity: 1;
		}
	}
	.image {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		object-fit: cover;
		&__container {
			position: relative;
			width: 10rem;
			// height: 8rem;
			flex: 1 1 35%;
			@include for-mobile {
				max-width: 10rem;
				width: inherit;
			}
		}
	}
	.info {
		flex: 1 1 calc(65% - 0.5rem);
    margin-left: var(--spacer-xs);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
		&__basic {
			display: flex;
			&--date {
				// flex: 1 1 15%;
				font-family: var(--font-family-primary);
				background: var(--c-primary);
		    padding: var(--spacer-xs) var(--spacer-xs) var(--spacer-2xs);
		    width: 2.5rem;
		    height: 3.2rem;
		    display: flex;
		    flex-direction: column;
		    justify-content: space-between;
				span {
					display: block;
					text-align: center;
					color: var(--c-white);
					font-size: var(--font-sm);
					font-weight: var(--font-medium);
					line-height: 1.2;
				}
				&-year {
					font-weight: var(--font-normal) !important;
					font-size: var(--font-2xs) !important;
				}
			}
			&--title {
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				flex: 1 1 calc(85% - .5rem);
				margin-left: var(--spacer-xs);
				p {
					margin: 0;
					text-transform: uppercase;
					font-size: var(--font-xs);
					font-weight: var(--font-light);
				}
				h1 {
					margin: 0;
					font-size: var(--font-base);
					line-height: 1.2;
					overflow: hidden;
			    height: 38px;
			    text-overflow: ellipsis;
			    display: -webkit-box;
			    -webkit-line-clamp: 2;
			    -webkit-box-orient: vertical;
				}
			}
			&--details {
				font-size: var(--font-xs);
				font-weight: var(--font-normal);
				color: var(--c-gray);
				display: flex;
				&-block {
					display: flex;
					align-items: center;
					// margin: var(--spacer-2xs) var(--spacer-sm) 0 0;
					margin-right: var(--spacer-sm);
					img {
						width: .84rem;
						height: .84rem;
						margin-right: var(--spacer-2xs);
						filter: invert(50%) sepia(2%) saturate(1854%) hue-rotate(188deg) brightness(90%) contrast(83%);
					}
				}
			}
		}
		&__description {
			p {
				font-size: var(--font-xs);
				line-height: 1.4;
				font-weight: var(--font-normal);
				margin-bottom: 0;
				overflow: hidden;
		    height: 50px;
		    text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-line-clamp: 3;
		    -webkit-box-orient: vertical;
			}
		}
		&__action {
			&--content {
	      display: flex;
	      flex-direction: column;
	      justify-content: space-between;
	      flex: 1 1 80%;
	      text-align: left;
	      &-action {
	        display: flex;
	        align-items: center;
	        background: transparent;
	        margin: var(--spacer-xs) 0 0;
	        border: 0;
	        padding: 0;
	        font-family: var(--font-family-primary);
	        font-weight: var(--font-medium);
	        color: var(--c-text);
	        cursor: pointer;
	        opacity: .5;
	        transition: .3s ease;
	        &:hover {
	        	opacity: 1;
	        	text-decoration: underline;
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
	            // filter: invert(38%) sepia(66%) saturate(3288%) hue-rotate(181deg) brightness(87%) contrast(100%);
	          }
	        }
	      }
	    }
		}
	}
}
.action {
	position: absolute;
  display: flex;
  // flex-direction: column;
  right: var(--spacer-sm);
  bottom: var(--spacer-sm);
  &__button {
  	outline: none;
    border: none;
    cursor: pointer;
    background: var(--c-primary);
    color: var(--c-white);
    padding: var(--spacer-2xs) var(--spacer-xs);
    font-size: var(--font-xs);
    font-family: var(--font-family-secondary);
    margin-left: var(--spacer-2xs);
    transition: .3s ease;
    &:hover {
    	text-decoration: underline;
    }
  	&--edit {
  		background: var(--c-gray);
  	}
  	&--delete {
  		background: var(--c-danger);
  	}
  }
}
</style>