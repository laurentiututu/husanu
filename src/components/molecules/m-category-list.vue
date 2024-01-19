<template>
	<SfTable>
		<SfTableHeading class="tableRow">
			<SfTableHeader v-for="(header, i) in headers" :key="i">{{ $t(header) }}</SfTableHeader>
		</SfTableHeading>
		<SfTableRow v-for="(category, i) in categories" :key="i" class="tableRow">
    	<SfTableData>
				<span>{{ category.name }}</span>
			</SfTableData>
    	<SfTableData>
    		<span>{{ category.articleCount }}</span>
    	</SfTableData>
    	<SfTableData>
    		<span
    			class="status"
    			:class="category.active ? 'statusCategory__active' : 'statusCategory__inactive'"
    		>
    			{{ category.active ? $t('Active') : $t('Inactive') }}
    		</span>
    	</SfTableData>
    	<SfTableData>
    		<button
    			class="statusCategory"
    			@click="updateStatus(category)"
    		>
    			{{ category.active ? $t('Disable') : $t('Enable') }}
    		</button>
    	</SfTableData>
		</SfTableRow>
		<SfTableRow class="tableRow">
    	<SfTableData>
				<SfInput
					v-model="new_category.name"
					class="categoryInput"
					type="text"
					:placeholder="$t('New Category')"
				/>
			</SfTableData>
    	<SfTableData>
    		<span>{{ '' }}</span>
    	</SfTableData>
    	<SfTableData>
    		<span>{{ '' }}</span>
    	</SfTableData>
    	<SfTableData>
    		<button
    			class="statusCategory"
    			:class="{ 'statusCategory__disabled': !new_category.name}"
    			@click="newCategory"
    			:disabled="new_category.name ? false : true"
    		>
    			{{ $t('Add') }}
    		</button>
    	</SfTableData>
		</SfTableRow>
	</SfTable>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { SfTable, SfInput } from '@storefront-ui/vue'

export default {
	components: {
		SfTable,
		SfInput
	},
	props: {
		categories: {
			type: Array,
			default: () => ([])
		}
	},
	data () {
		return {
			headers: [ 'Name', 'Posts', 'Status', 'Action' ],
			new_category: {
				name: ''
			},
		}
	},
	methods: {
		...mapActions({
			addCategory: 'addCategory',
			updateCategory: 'updateCategory'
		}),
		async newCategory () {
			await this.addCategory(this.new_category)
			this.new_category.name = ''
		},
		updateStatus (category) {
			this.updateCategory({ id: category.id, status: { active: !category.active }})
		}
	}
}
</script>
<style lang="scss" scoped>
.categories {
	span {
		display: flex;
		align-items: center;
		height: 2rem;
		font-family: var(--font-family-secondary);
		font-weight: var(--font-normal);
		font-size: var(--font-sm);
	}
}
.categoryInput {
	--input-height: 2rem;
	--input-font-size: var(--font-sm);
}
.statusCategory {
  font-family: var(--font-family-secondary);
  font-size: var(--font-sm);
  width: 70%;
  border: none;
  background: var(--c-primary);
  color: var(--c-white);
  border-radius: 10px;
  font-weight: var(--font-medium);
  height: 2rem;
  margin: 0 auto;
  text-transform: none;
  cursor: pointer;
  transition: .3s ease;
  &:hover {
  	background: var(--c-primary-darken);
  }
  &__active {
  	background: #4A934A;

  	&:hover {
  		background: #376E37;
  	}
  }
  &__inactive {
  	background: #AE423F;

  	&:hover {
  		background: #82322F;
  	}
  }
  &__disabled {
  	background: var(--c-gray-lighten);
  	cursor: default;
  	&:hover {
  		background: var(--c-gray-lighten);
  	}
  }
}
.tableRow {
	--table-heading-padding: var(--spacer-sm) var(--spacer-xs);
	--table-row-padding: var(--spacer-xs);
	align-items: center;

	&::v-deep .sf-table__data {
		&:not(:first-child) {
			text-align: center;
		}
	}
	&::v-deep .sf-table__header {
		&:not(:first-child) {
			text-align: center;
		}
	}
}
.status {
  display: block;
	width: 3rem;
  margin: 0 auto;
  text-align: center;
	padding: var(--spacer-2xs) var(--spacer-sm);
	font-size: var(--font-xs);
	color: var(--c-white);
	user-select: none;
}
</style>