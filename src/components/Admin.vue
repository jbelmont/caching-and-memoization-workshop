<template>
  <div class="admin-container">
    <ul class="admin-container-tree">
      <li>{{ADD_USER}}</li>
    </ul>
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
  }
}
</script>

<style lang="scss">
.admin-container-tree {
  list-style-type: none;
  display: flex;
  justify-content: center;
  padding: 0
}
</style>
