<template lang="">
  <TheHeader />
  <h1>Workspace</h1>
  <button @click="workspaceStore.createWorkspace">
    워크스페이스 생성!
  </button>
  <section :key="$route.params.id">
    <div class="poster">
      <img 
        v-if="workspaceStore.workspace.poster"
        :src="workspaceStore.workspace.poster"
        alt="Poster" />
      <input
        type="file"
        @change="selectPoster" />
      <button @click="deletePoster">
        이미지 삭제!
      </button>
    </div>
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
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'
import TheHeader from '../components/TheHeader.vue'

export default {
  components: {
    TheHeader
  },
  computed: {
    ...mapStores(useWorkspaceStore)
  },
  watch: {
    $route() {
      this.workspaceStore.readWorkspaceDetails(this.$route.params.id)
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
    },
    // 이미지 등록은 워크스페이스 수정!
    selectPoster(event) {
      const { files } = event.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', e => {
          // 'load' => 파일이 다 읽히면
          // base64: 서버로 전송하기 위해 파일을 문자로 만드는 것
          this.workspaceStore.updateWorkspace({
            poster: e.target.result,
            id: this.$route.params.id
          })
        })
      }
    },
    deletePoster() {
      this.workspaceStore.updateWorkspace({
        poster: '-1',
        id: this.$route.params.id
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
