<template>
  <div class="users">
    <h1>Users</h1>
  </div>
</template>

<script>

export default {
  name: 'users',
  data () {
    return {
      users: []
    }
  },
  mounted: function () {
    this.getUsers()
  },
  methods: {
    getUsers: function () {
      this.$http.get('api/v1/users').then(function (users) {
        console.log(users)
      }, function (err) {
        console.error('Error requesting users: ')
        console.error(err)
      })
    }
  }
}
</script>

<style scoped></style>
