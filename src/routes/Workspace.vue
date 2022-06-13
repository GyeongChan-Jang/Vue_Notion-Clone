<template lang="">
  <h1>Workspace</h1>
  <button @click="workspaceStore.createWorkspace">
    워크스페이스 생성!
  </button>
  <section :key="$route.params.id">
    <h1 
      ref="title"
      contenteditable>
      {{ workspaceStore.workspaceDetails.title }}
    </h1>
    <p 
      ref="contnet"
      contenteditable>
      {{ workspaceStore.workspaceDetails.content }}
    </p>
  </section>
</template>

<script>
// store들을 맵핑하는
import {mapStores} from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'

export default {
  computed: {
    ...mapStores(useWorkspaceStore)
  },
  watch: {
    $route() {
      this.workspaceStare.readWorkspaceDetails(this.$route.params.id)
    }
  },
  created() {
    this.workspaceStore.readWorkspaceDetails(this.$route.params.id)
  },
  onInput() {
    // const title = e.target.value
    const title = this.$refs.title.textContent
    const content = this.$refs.content.innerHTML
  }
}
</script>
<style lang="">
  
</style>
