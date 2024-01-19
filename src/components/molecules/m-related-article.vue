<template>
	<div class="m-related-article">
		<div class="image">
			<img src="@/assets/images/articles/1.jpg">
		</div>
		<div class="content">
			<h4>{{ article.title }}</h4>
			<span>{{ getFormattedDate }}</span>
		</div>
	</div>
</template>
<script>

export default {
	props: {
		article: {
			type: Object,
			default: () => ({})
		}
	},
	computed: {
		getFormattedDate () {
			const date = new Date(this.article.updatedAt);
			const day = date.getDate();
			const month = date.getMonth();
			const year = date.getFullYear();

			const monthNames = [
			  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
			  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
			];

			return `${day} ${monthNames[month]} ${year}`;
		}
	}
}
</script>
<style lang="scss" scoped>
.m-related-article {
	display: flex;
	background: var(--c-white);
	padding: var(--spacer-xs);
	cursor: pointer;
	user-select: none;
	transition: .3s ease;

	&:hover {
		box-shadow: 0px 0px 25px -20px rgba(0,0,0,0.75);
	}
}
.image {
	position: relative;
	width: 4rem;
	min-height: 4rem;
	flex: 1 1 25%;
	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
.content {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	font-family: var(--font-family-primary);
	margin-left: var(--spacer-xs);
	flex: 1 1 75%;
	h4 {
		margin: 0;
		font-size: var(--font-sm);
	}
	span {
		font-size: var(--font-xs);
		font-weight: var(--font-medium);
		color: var(--c-text);
		opacity: .5;
		margin-top: var(--spacer-xs);
	}
}
</style>