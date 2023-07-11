export type RepoCardContent = {
  accessTime: number
  data: {
    content: string
  }
  isDeployed: boolean
}

export type RepoListNames = {
  accessTime: number
  names: Array<{ name: string }>
}
