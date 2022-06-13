<template lang="">
  <h1>Workspace</h1>
  <button @click="workspaceStore.createWorkspace">
    워크스페이스 생성!
  </button>
  <section :key="$route.params.id">
    <h1 
      ref="title"
      placeholder="제목 없음"
      contenteditable
      @blur="onInput">
      {{ workspaceStore.workspaceDetails.title }}
    </h1>
    <p 
      ref="content"
      placeholder="내용을 입력하세요!"
      contenteditable
      @blur="onInput"
      v-html="workspaceStore.workspaceDetails.content">
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
  methods: {
    onInput() {
    // const title = e.target.value
      const title = this.$refs.title.textContent
      const content = this.$refs.content.innerHTML
      
      if(!this.$refs.content.textContent.trim()) {
        this.$refs.content.innerHTML = ''
      }
      this.workspaceStore.updateWorkspace({
        id: this.$route.params.id,
        title,
        content
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  [contenteditable] {
    &:empty::before{
      content: attr(placeholder);
      color: lightgray;
    }
  }
</style>
