<script>
  import { AppBar, MaterialApp, Icon } from "svelte-materialify";
  import { mdiGlassMugVariant } from "@mdi/js";
  import { Router, Link, Route } from "svelte-routing";
  import Home from "@app/routes/Home.svelte";
  import Login from "@app/routes/Login.svelte";
  import Layout from "@app/components/Layout.svelte";
</script>

<MaterialApp class="grey lighten-4">
  <AppBar class="orange darken-2 theme--dark ">
    <span slot="icon">
      <Icon path={mdiGlassMugVariant} class="ml-3" />
    </span>
    <span slot="title">Bring Beer</span>
  </AppBar>
  <Layout>
    <Router>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
    </Router>
  </Layout>
</MaterialApp>
