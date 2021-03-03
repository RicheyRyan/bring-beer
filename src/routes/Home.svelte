<script>
  import { Tabs, Tab, TabContent, Icon } from "svelte-materialify";
  import { mdiCalendarClock, mdiAccountCircle } from "@mdi/js";
  import Events from "@app/components/Events.svelte";
  import UserForm from "@app/components/UserForm.svelte";
</script>

<Tabs grow class="orange-text lighten-2">
  <div slot="tabs">
    <Tab>
      <Icon path={mdiCalendarClock} class="orange-text lighten-2 mr-3" />
      Events
    </Tab>
    <Tab>
      <Icon path={mdiAccountCircle} class="orange-text lighten-2 mr-3" />
      Your profile
    </Tab>
  </div>
  <section class="mt-4 mb-2 ml-2 mr-2">
    <TabContent>
      <Events />
    </TabContent>
    <TabContent>
      <UserForm />
    </TabContent>
  </section>
</Tabs>
