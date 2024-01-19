<template>
	<div class="m-article-form">
		<h3 class="new__header">{{ $t('Article Info') }}</h3>
		<div class="new__info">
			<div class="formInput__image new__info--cover" @click="$refs['cover-image'].click()">
				<div v-if="newPost.cover" class="formInput__image--overlay">
					<span>{{ $t('Change') }}</span>
				</div>
				<img
					:src="newPost.cover.preview ? newPost.cover.preview : require('@/assets/icons/insert-picture.png')"
					:class="newPost.cover.preview ? 'formInput__image--preview' : 'formInput__image--static'"
				>
				<input
					type="file"
					name="image"
					ref="cover-image"
					class="d-none"
					@change="changeCover"
				>
			</div>
			<div class="new__info--basic">
				<SfInput
					v-model="newPost.title"
					type="text"
					:label="$t('Title')"
					class="formInput"
				/>
				<div class="new__container">
					<SfSelect
						v-model="newPost.category"
						class="formInput__half"
		        name="category"
		        :key="categories.length"
		        :label="$t('Category')"
		      >
		        <SfSelectOption
		          v-for="(category, i) in activeCategories"
		          :key="i"
		          :value="category.id"
		        >
		          {{ category.name }}
		        </SfSelectOption>
		      </SfSelect>
					<SfInput
						v-model="newPost.readTime"
						type="number"
						:label="$t('Read Time (minutes)')"
						class="formInput__half"
					/>
				</div>
				<SfInput
					v-model="newPost.description"
					type="text"
					:label="$t('Short Description')"
					class="formInput"
				/>
			</div>
		</div>

		<h3 class="new__header">{{ $t('Article Content') }}</h3>
		<div v-if="newPost.content.length" :key="newPost.content.length" class="new__content">
			<div v-for="(block, i) in newPost.content" :key="i" class="inputContent__container">
				<input
					v-if="block.type == 'subtitle'"
					v-model="block.content"
					class="inputContent"
					:class="`inputContent__${block.type}`"
					type="text"
					:name="block.type"
					:placeholder="$t(`This is a ${block.type}`)"
				>
				<input
					v-if="block.type == 'note'"
					v-model="block.content"
					class="inputContent"
					:class="`inputContent__${block.type}`"
					type="text"
					:name="block.type"
					:placeholder="$t(`This is a ${block.type}`)"
				>
				<textarea
					v-if="block.type == 'description'"
					v-model="block.content"
					:ref="`description_${i}`"
					class="inputContent"
					:class="`inputContent__${block.type}`"
					type="text"
					:name="block.type"
					:placeholder="$t(`This is a ${block.type}`)"
					@input="autoResize(`description_${i}`)"
					@change="autoResize(`description_${i}`)"
				/>
				<ul
					v-if="block.type == 'list'"
					class="inputContent"
					:class="`inputContent__${block.type}`"
				>
					<li
						v-for="(listItem, j) in block.content"
						:key="j"
						:class="`inputContent__${block.type}--itemlist`"
					>
						<input
							v-model="listItem.item"
							:class="`inputContent__${block.type}--itemlist-item`"
							type="text"
							:name="`${block.type}_item`"
							:placeholder="$t('List Item')"
						>
					</li>
					<button :class="`inputContent__${block.type}--button`" @click="addListItem(block)">
						{{ $t('Add Item') }}
					</button>
				</ul>
				<div
					v-if="block.type == 'image' && block.content"
					class="inputContent"
					:class="`inputContent__${block.type}`"
				>
					<img :src="block.preview">
				</div>
				<img src="@/assets/icons/bin.png" class="deleteIcon" @click="deleteElement(i)">
			</div>
		</div>
		<p v-else>{{ $t('You have no elements. Start adding some.') }}</p>
		<div class="new__container new__container--bottom">
			<SfSelect
				v-model="contentType.active"
				class="formInput__half"
        name="contentType"
        :key="contentType.list.length"
        :label="$t('Add Element')"
      >
        <SfSelectOption
          v-for="(type, i) in contentType.list"
          :key="i"
          :value="type.toLowerCase()"
        >
          {{ type }}
        </SfSelectOption>
      </SfSelect>
      <button class="formInput__half formInput__action" @click="addElement">Add</button>
      <input
				type="file"
				name="image"
				ref="new-image"
				class="d-none"
				@change="changeImage"
			>
			<button class="formInput__action formInput__full" @click="postArticle">{{ $t('Post Article') }}</button>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions} from 'vuex'
import { SfInput, SfSelect } from '@storefront-ui/vue'

export default {
	components: {
		SfInput,
		SfSelect
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
			newPost: {
				title: '',
				description: '',
				category: '',
				readTime: null,
				cover: {
					preview: '',
					file: ''
				},
				content: []
			}
		}
	},
	computed: {
		...mapGetters({
			categories: 'getCategoriesAdmin',
			getCurrentImage: 'getCurrentImage'
		}),
		activeCategories () {
			let categories = []
			this.categories.forEach(category => { if (category.active) {categories.push(category)} })
			return categories
		}
	},
	methods: {
		...mapActions({
			addArticle: 'addArticle',
			addImage: 'addImage',
			deleteImage: 'deleteImage'
		}),
		addElement () {
			this.newPost.content.push({
				type: this.contentType.active,
				content: this.contentType.active !== 'list' ? '' : [{ item: ''}]
			})
			if (this.contentType.active == 'image') {
				this.$refs['new-image'].click()
			}
			this.contentType.active = ''
		},
		deleteElement (position) {
			this.newPost.content.splice(position, 1)
		},
		addListItem (block) {
			block.content.push({ item: '' })
		},
		async newArticle () {
			this.newPost.content.forEach((item, index) => item.position = index)
		  const article_content = [];
		  const promises = this.newPost.content.map(async (block) => {
		    switch (block.type) {
		      case 'subtitle':
		      case 'description':
		      case 'note':
		        article_content.push({
		          type: block.type,
		          content: block.content,
		          position: block.position
		        });
		        break;
		      case 'list': {
		        const baseList = block.content.map((listItem) => listItem.item);
		        article_content.push({
		          type: block.type,
		          content: baseList.toString(),
		          position: block.position
		        });
		        break;
		      }
		      case 'image': {
		        const formData = new FormData();
		        formData.append('file', block.content);
		        await this.addImage(formData);
		        article_content.push({
		          type: block.type,
		          content: this.getCurrentImage.path,
		          position: block.position
		        });
		        break;
		      }
		    }
		  });

		  // Wait for all promises to complete in the original order before returning the article data
		  await Promise.all(promises);

		  return {
		    title: this.newPost.title,
		    description: this.newPost.description,
		    category: this.newPost.category,
		    readTime: this.newPost.readTime,
		    content: article_content
		  };
		},
		async postArticle () {
		  try {
		    let article = await this.newArticle();
		    console.log(article);
		    this.addArticle({ article: article, cover: this.newPost.cover.file });
		    this.$emit('post', {name: 'All'})
		  } catch (error) {
		    console.error('Error posting article:', error);
		  }
		},
		autoResize (element) {
      this.$refs[element][0].style.height = 'auto';
      this.$refs[element][0].style.height = this.$refs[element][0].scrollHeight + 'px';
    },
    getImage (path) {
    	return require(path)
			// return config.api + path
		},
		async changeImage (e) {
      let imageFile = e.target.files[0]
      let previewImage = URL.createObjectURL(imageFile)
      this.newPost.content[this.newPost.content.length - 1].content = imageFile
      this.newPost.content[this.newPost.content.length - 1].preview = previewImage
    },
    changeCover (e) {
    	let imageFile = e.target.files[0]
    	const formData = new FormData();
		  formData.append('picture', imageFile);
    	this.newPost.cover.preview = URL.createObjectURL(imageFile)
    	this.newPost.cover.file = formData
    }
	}
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.new {
	margin: var(--spacer-lg) 0;
	&__info {
		display: flex;
		align-items: center;
		&--cover {
			flex: 1 1 35%;
		}
		&--basic {
			flex: 1 1 calc(65% - 1rem);
			margin-left: var(--spacer-sm);
		}
	}
	&__container {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;

		&--bottom {
	    height: 3.2rem;
	    background: var(--c-light);
			border-top: 1px solid var(--c-light);
			border-bottom: 1px solid var(--c-light);
			margin: var(--spacer-lg) 0 0;
		}
	}
	&__header {
		margin: var(--spacer-sm) 0;
    padding: 0;
    border-bottom: 1px solid var(--c-primary);
    font-family: var(--font-family-primary);
    font-weight: var(--font-medium);
    font-size: var(--font-base);
	}
}
.formInput {
	text-transform: capitalize;
	&__half {
		flex: 1 1 calc(50% - 2%);
		max-width: 49%;
		@include for-mobile {
			flex: 1 1 calc(100% - 2%);
			max-width: 100%;
		}
	}
	&__full {
		width: 100%;
	}
	&__image {
		position: relative;
    width: 96.5%;
    height: 12rem;
    margin: var(--spacer-xs) 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--c-gray);
    cursor: pointer;
    transition: .3s ease;

    &:hover {
    	background: var(--c-gray-darken);
    }
    &--static {
    	width: 2rem;
    	height: 2rem;
    	filter: invert(1);
    }
    &--preview {
    	position: absolute;
    	width: 100%;
    	height: 100%;
    	top: 0;
    	left: 0;
    	object-fit: cover;
    }
    &--overlay {
    	display: flex;
    	justify-content: center;
    	align-items: center;
    	position: absolute;
    	width: 100%;
    	height: 100%;
    	background: rgba(0, 0, 0, .5);
    	color: var(--c-white);
    	text-transform: uppercase;
    	font-weight: var(--font-medium);
    	font-family: var(--font-family-secondary);
    	opacity: 0;
    	cursor: pointer;
    	user-select: none;
    	transition: .3s ease;
    	z-index: 1;
    	&:hover {
    		opacity: 1;
    	}
    }
	}
	&__action {
		border: none;
    background: var(--c-primary);
    padding: var(--spacer-xs) 0;
    height: 3.2rem;
    color: var(--c-white);
    margin: 0 0 var(--spacer-sm);
    font-size: var(--font-lg);
    font-family: var(--font-family-secondary);
    font-weight: var(--font-normal);
    cursor: pointer;
    user-select: none;
    transition: .3s ease;

    &:hover {
    	background: var(--c-primary-darken);
    }
	}
}
.inputContent {
  display: block;
  width: 96.5%;
	margin: var(--spacer-xs) 0;
	font-family: var(--font-family-secondary);
  border: solid var(--c-light);
	border-width: 1px;
	padding: 0;
  outline: none;
	&::placeholder {
		text-transform: capitalize;	
	}
	&__container {
		position: relative;
	}
	&__subtitle {
	  font-size: var(--font-lg);
	  font-weight: var(--font-bold);
	}
	&__description {
    font-weight: var(--font-normal);
		font-size: .8rem;
		line-height: 1.6;
		resize: none;
		min-height: 5rem;
	}
	&__note {
    padding: 0.75rem var(--spacer-sm);
    border-left: 4px solid var(--c-primary);
    font-size: .8rem;
    width: calc(96.5% - 2rem - 4px) !important;
	}
	&__list {
		padding: 0 var(--spacer-sm);
    margin: var(--spacer-xs) 0;
    width: calc(96.5% - 2rem);
		&--itemlist {
	    padding: 0;
	    list-style-type: disc;

	    &-item {
	    	border: 1px solid var(--c-light);
	    	outline: none;
	    	padding: var(--spacer-2xs) 0;
	    	font-family: var(--font-family-secondary);
	    	font-size: .8rem;
	    	width: 100%;
	    }
		}
		&--button {
			background: transparent;
			border: none;
			outline: none;
			cursor: pointer;
			font-family: var(--font-family-secondary);
			font-weight: var(--font-normal);
			font-size: .8rem;
			padding: 0;
			color: var(--c-primary);
			&:hover {
				text-decoration: underline;
			}
		}
	}
	&__image {
		position: relative;
    width: 96.5%;
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
}
.d-none {
	display: none;
}
.deleteIcon {
	position: absolute;
	top: .2rem;
	right: .2rem;
	width: 1rem;
	height: auto;
	filter: invert(34%) sepia(63%) saturate(841%) hue-rotate(318deg) brightness(107%) contrast(87%);
	cursor: pointer;
}
</style>