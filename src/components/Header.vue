<template>
    <header>
      <div class="logo">Logo</div>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/edit-profile">Edit Profile</router-link></li>
          <li><router-link to="/view-profile">View Profile</router-link></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: white;

  .logo {
    font-size: 24px;
    font-weight: bold;
  }

  nav ul {
    list-style: none;
    display: flex;
  }

  nav li {
    margin-left: 20px;
  }

  nav a {
    color: white;
    text-decoration: none;
  }

  @media screen and (max-width: 600px) {
    nav ul {
      flex-direction: column;
    }

    nav li {
      margin: 10px 0;
    }
  }
}
</style>

  