<template>
	<div class="m-comments-admin">
		<SfTable>
			<SfTableHeading>
				<SfTableHeader v-for="(header, i) in headers" :key="i">{{ $t(header) }}</SfTableHeader>
			</SfTableHeading>
			<SfTableRow v-for="(comment, i) in comments" :key="i">
				<SfTableData>
					<div class="data__container">
						<p>{{ comment.name }}</p>
						<span>{{ comment.email }}</span>
					</div>
				</SfTableData>
				<SfTableData>
					<span
						class="data__status"
						:class="{
							'data__status--accepted': comment.status == 'accepted',
							'data__status--pending': comment.status == 'pending',
							'data__status--declined': comment.status == 'declined'
						}"
					>
						{{ comment.status }}
					</span>
				</SfTableData>
				<SfTableData>
					<p class="data__comment">{{ comment.content }}</p>
				</SfTableData>
				<SfTableData>
					<template v-if="comment.status == 'pending'">
						<button
							@click="setCommentStatus(comment._id, 'accepted')"
							class="data__action data__action--approve"
						>
							{{ $t('Approve') }}
						</button>
						<button
							@click="setCommentStatus(comment._id, 'declined')"
							class="data__action data__action--decline"
						>
							{{ $t('Decline') }}
						</button>
					</template>
					<button v-else class="data__action data__action--idle">{{ $t('No action needed') }}</button>
				</SfTableData>
			</SfTableRow>
		</SfTable>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { SfTable } from '@storefront-ui/vue'

export default {
	components: {
		SfTable
	},
	data () {
		return {
			headers: ['Author', 'Status', 'Comment', 'Action']
		}
	},
	async mounted () {
		await this.fetchComments()
	},
	computed: {
		...mapGetters({
			comments: 'getCommentsAdmin'
		})
	},
	methods: {
		...mapActions({
			fetchComments: 'fetchCommentsAdmin',
			updateComment: 'updateComment'
		}),
		setCommentStatus (id, status) {
			this.updateComment({ id: id, status: status })
		}
	}
}
</script>
<style lang="scss" scoped>
.m-comments-admin {
	&::v-deep .sf-table {
		// .sf-table__heading {
		// 	.sf-table__header {
		// 		&:nth-child(:first-child) {
		// 			margin: 0 auto;
		// 			text-align: center;
		// 		}
		// 	}
		// }
		.sf-table__row {
			align-items: center;
		}
	}
}
.data {
	&__container {
		p {
			margin: 0;
	    font-size: var(--font-xs);
	    font-weight: var(--font-medium);
	    color: var(--c-text);
			line-height: 1.2;
		}
		span {
			margin: 0;
	    font-size: var(--font-2xs);
	    font-weight: var(--font-normal);
	    color: var(--c-gray);
			line-height: 1.2;
		}
	}
	&__status {
		display: block;
		text-align: center;
		color: var(--c-white);
    font-size: var(--font-xs);
    padding: var(--spacer-2xs) var(--spacer-xs);
    text-transform: uppercase;
    width: 5rem;
    &--accepted {
    	background: #4A934A;
    }
    &--pending {
    	background: #C08A3E;
    }
    &--declined {
    	background: #AE423F;
    }
	}
	&__comment {
		font-size: var(--font-xs);
		line-height: 1.2;
		color: var(--c-text);
		font-weight: var(--font-normal);
		margin: 0 var(--spacer-xs) 0 0;
	}
	&__action {
		color: var(--c-white);
    font-size: var(--font-xs);
    padding: var(--spacer-2xs) var(--spacer-xs);
    text-transform: uppercase;
    font-family: var(--font-family-secondary);
    outline: none;
    border: none;
    display: block;
    width: 6rem;
    margin: var(--spacer-2xs) 0;
    opacity: .75;
    cursor: pointer;
    transition: .3s ease;
    text-align: center;
		user-select: none;
    &:hover {
    	opacity: 1;
    }
		&--approve {
    	background: #4A934A;
		}
		&--decline {
    	background: #AE423F;
		}
		&--idle {
			background: var(--c-gray);
			opacity: 1;
			user-select: none;
			cursor: default;
		}
	}
}
</style>