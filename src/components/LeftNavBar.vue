<template lang="">
  <ul>
    <WorkspaceItem 
      v-for="workspace in workspaceStore.workspace"
      :key="workspace.id" 
      :workspace="workspace" />
  </ul>
</template>
<script>
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'
import WorkspaceItem from './WorkspaceItem.vue'
// import { RouterLink } from 'vue-router'

export default {
  computed: {
    ...mapStores(useWorkspaceStore)
  },
  created() {
    this.workspaceStore.readWorkspaces()
  },
  components: {
    WorkspaceItem
  }
}
</script>
<style lang="">
  
</style>
