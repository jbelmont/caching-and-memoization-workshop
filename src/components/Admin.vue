<template>
  <div class="admin-container">
    <div class="admin-container-tree">
      <a class="admin__add-user-btn" href="#" v-on:click="removeUser"><span>{{REMOVE_USER}}</span></a>
    </div>
  </div>
</template>

<script>
import * as constants from '../constants'
const {
  ADD_USER,
  REMOVE_USER
} = constants

export default {
  data () {
    return {
      ADD_USER,
      REMOVE_USER
    }
  },
  methods: {
    removeUser: () => {
      console.log('hello')
    }
  }
}
</script>

<style lang="scss">
@import '../scss/variables';

.admin-container-tree {
  list-style-type: none;
  display: flex;
  justify-content: center;
  padding: 0
}

.admin__add-user-btn {
	position: relative;
	display: inline-block;
	padding: 1.2em 2em;
	text-decoration: none;
	text-align: center;
	cursor: pointer;
	user-select: none;
	color: $button-bg-3;
}
</style>
