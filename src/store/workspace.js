import { defineStore } from 'pinia'

// 이름 정의 컨벤션: use + 모듈이름 + store
export const useWorkspaceStore = defineStore('workspace', {
  // 상태, 계산된 상태, 액션
  state() {
    return {
      workspaces: [],
      workspaceDetails: {} // 어떤 구조로 올지 모른다면 null로도 설정 가능(명시적)
    }
  },
  getters: {},
  actions: {
    async createWorkspace() {
      // fetch('주소', options)
      let res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'apikey': 'FcKdtJs202204',
            'username': 'GyeongChan'
          },
          body: JSON.stringify({
            parentId: '',
            title: '처음 만드는 워크스페이스',
            content: '내용...',
            poster: ''
          })
        }
      )
      let workspace = await res.json()
      console.log(workspace)
      this.readWorkspaces()
    },
    async readWorkspaces() {
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces',
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'apikey': 'FcKdtJs202204',
            'username': 'GyeongChan'
          }
        }
      )
      const workspaces = await res.json()
      console.log(workspaces)
      this.workspaces = workspaces
    },
    async readWorkspaceDetails (id) {
      const res = await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'apikey': 'FcKdtJs202204',
            'username': 'GyeongChan'
          }
        }
      )
      const workspaceDetails = await res.json()
      console.log(workspaceDetails)
      this.workspaceDetails = workspaceDetails
    },
    // U
    async updateWorkspace(payload) {
      const {id, title, content} = payload
      await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'apikey': 'FcKdtJs202204',
            'username': 'GyeongChan'
          },
          body: JSON.stringify({
            title,
            content,
          })
        }
      )
      this.readWorkspaces()
    },
    // D
    async deleteWorkspace(id) {
      await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`,
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'apikey': 'FcKdtJs202204',
            'username': 'GyeongChan'
          }
        }
      )
      this.readWorkspaces()
    },
  }
})
