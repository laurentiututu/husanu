<template>
  <div class="aselect" :data-value="value" :data-list="users">
    <div class="selector" @click="toggle()">
      <div class="label">
		    <span>{{ value }}</span>
      </div>
			<div class="arrow" :class="{ expanded : visible }"></div>
      <div :class="{ hidden : !visible, visible }">
        <ul>
          <li
          	v-for="(user, i) in users"
          	:key="i"
          	:class="{ current : user === value }"
          	@click="select(user)"
          >
          	{{ `${user.firstName} ${user.lastName}` }}
        	</li>
        </ul>
      </div>
    </div>
	</div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
	props: {
		booking: {
			type: Object,
			default: () => ({})
		},
		users: {
			type: Array,
			default: () => ([])
		}
	},
	data () {
		return {
			value: '',
      visible: false
		}
	},
	mounted () {
		this.value = this.booking.assignedEmployee
	},
	methods: {
		...mapActions({
			assign: 'assignBooking'
		}),
		toggle() {
			this.visible = !this.visible;
		},
		select(user) {
			this.value = `${user.firstName} ${user.lastName}`;
			console.log(user)
			console.log(this.booking)
			let data = {
				booking: this.booking.id,
				employee: {
					id: user.id,
					name: `${user.firstName} ${user.lastName}`
				}
			}
			this.assign(data)
		}
	}
}
</script>
<style lang="scss" scoped>
.aselect {
	width: 10rem;
  margin: 0 auto;
	.selector {
		border: 1px solid var(--c-light);
		background: var(--c-light);
		position: relative;
		.arrow {
			position: absolute;
			right: 10px;
			top: 40%;
			width: 0;
			height: 0;
			border-left: 5px solid transparent;
			border-right: 5px solid transparent;
			border-top: 7px solid var(--c-gray);
			transform: rotateZ(0deg) translateY(0px);
			transition-duration: 0.3s;
			transition-timing-function: cubic-bezier(.59,1.39,.37,1.01);
		}
		.expanded {
			transform: rotateZ(180deg) translateY(2px);
		}
		.label {
			display: block;
			padding: var(--spacer-2xs);
			font-size: var(--font-xs);
			color: var(--c-gray);
			cursor: pointer;
			user-select: none;
		}
	}
	ul {
		width: 100%;
		list-style-type: none;
    padding: 0;
    margin: 0;
		font-size: var(--font-xs);
		border: 1px solid var(--c-light);
		position: absolute;
		z-index: 2;
    background: #fff;
    transform: translateX(-1px);
	}
	li {
		padding: var(--spacer-2xs);
		color: var(--c-gray);
		cursor: pointer;
		user-select: none;
		&:hover {
			color: white;
			background: var(--c-primary);
		}
	}
	.current {
		background: #eaeaea;
	}
	.hidden {
		visibility: hidden;
	}
	.visible {
		visibility: visible;
	}
}
</style>