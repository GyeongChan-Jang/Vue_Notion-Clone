import { defineStore } from 'pinia'
import router from '~/routes'

// 이름 정의 컨벤션: use + 모듈이름 + store
export const useWorkspaceStore = defineStore('workspace', {
  // 상태, 계산된 상태, 액션
  state() {
    return {
      workspace: {},
      workspaceDetails: [],
      currentWorkspacePath: [] // 어떤 구조로 올지 모른다면 null로도 설정 가능(명시적)
    }
  },
  getters: {},
  actions: {
    async createWorkspace(payload = {}) {
      const { parentId } = payload
      // fetch('주소', options)
      let workspace = await request({
        method: 'POST',
        body: {
          parentId,
          poster: ''
        }
      })
      console.log(workspace)
      this.readWorkspaces()
    },
    async readWorkspaces() {
      const workspaces = await request({
        method: 'GET'
      })
      console.log(workspaces)
      this.workspace = workspaces
    },
    async readWorkspaceDetails(id) {
      const workspaceDetails = await request({
        method: 'GET',
        id
      })
      console.log(workspaceDetails)
      this.workspaceDetails = workspaceDetails
    },
    // U
    async updateWorkspace(payload) {
      const { id, title, content, poster } = payload
      const updatedWorkspace = await request({
        method: 'PUT',
        id,
        body: {
          title,
          content,
          poster
        }
      })
      this.workspace = updatedWorkspace
      this.readWorkspaces()
    },
    // D
    async deleteWorkspace(id) {
      await request({
        id,
        method: 'DELETE'
      })
      this.readWorkspaces()
    },
    findWorkspacePath() {
      const currentWorkspaceId = router.currentRoute.value.params.id
      function find(workspace, parents) {
        if (currentWorkspaceId === workspace.id) {
          this.currentWorkspacePath = [...parents, workspace]
        }
        if (workspace.children) {
          workspace.children.forEach((ws) => {
            find(ws, [...parents, workspace])
          })
        }
      }
      this.workspaceDetails.forEach((workspace) => {
        find(workspace, [])
      })
    }
  }
})

async function request(options) {
  const { id = '', method, body } = options
  const res = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`,
    {
      method: `${method}`,
      headers: {
        'content-type': 'application/json',
        apikey: 'FcKdtJs202204',
        username: 'GyeongChan'
      },
      body: JSON.stringify(body)
    }
  )
  return res.json()
}
