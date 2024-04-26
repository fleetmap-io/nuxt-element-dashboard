<template>
  <div style="padding: 10px">
    <form action="/api/session" method="post">
      <input id="email" type="text" name="email">
      <label for="email">Email</label>
      <input id="password" type="text" name="password">
      <label for="password">Password</label>
      <input type="submit">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>
