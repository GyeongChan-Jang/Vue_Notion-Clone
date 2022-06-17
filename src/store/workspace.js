import { defineStore } from 'pinia'

// 이름 정의 컨벤션: use + 모듈이름 + store
export const useWorkspaceStore = defineStore('workspace', {
  // 상태, 계산된 상태, 액션
  state() {
    return {
      workspace: {},
      workspaces: [],
      workspacesLoaded: false, // 서버에서 데이터 가지고 오고나면 true로 갱신됨
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
      window.location.href = `/workspaces/${workspace.id}`
    },
    async readWorkspaces() {
      const workspaces = await request({
        method: 'GET'
      })
      console.log(workspaces)
      this.workspaces = workspaces
      this.workspacesLoaded = true

      if (!this.workspaces.length) {
        this.createWorkspace()
      }
    },
    async readWorkspace(id) {
      const workspace = await request({
        method: 'GET',
        id
      })
      console.log(workspace)
      this.workspace = workspace
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
    findWorkspacePath(currentWorkspaceId) {
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
      this.workspaces.forEach((workspace) => {
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
      method,
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
