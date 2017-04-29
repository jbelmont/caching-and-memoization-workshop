<template>
  <div class="caching-container">
    <nav class="navigation-container">
      <div class="navigation-container-dashboard">
      </div>
      <div class="navigation-container-settings">
      </div>
      <div class="navigation-container-profile"></div>
    </nav>
    <ul id="users-list">
      <template v-for="user in users">
        <li>{{ user.first_name }}</li>
        <li>{{ user.last_name }}</li>
        <li>{{ user.email }}</li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'index',
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
      this.$http.get('api/v1/users').then(function (data) {
        this.users = data.body
      }, function (err) {
        console.error(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
