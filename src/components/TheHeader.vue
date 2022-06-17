<template lang="">
  <header>
    Header!!
    <ul>
      <li
        v-for="path in workspaceStore.currentWorkspacePath"
        :key="path.id">
        <RouterLink :to="`/workspaces/${path.id}`">
          {{ path.title || '제목 없음' }}
        </RouterLink>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '../store/workspace'

export default {
  computed: {
    ...mapStores(useWorkspaceStore),
    workspacesLoaded() {
      return this.workspaceStore.workspacesLoaded
    }
  },
  watch: {
    // newvalue와 oldvalue를 받아서 처리하는 함수
    workspacesLoaded(value) {
      value && this.workspaceStore.findWorkspacePath(this.$route.params.id)
    },
    // $route() {
    //   this.workspaceStore.findWorkspacePath(this.$route.params.id)
    // }
  }
}
</script>
<style lang="">
  
</style>
