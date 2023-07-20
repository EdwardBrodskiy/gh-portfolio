export type RepoCardContent = FetchedData & {
  data: {
    content: string
  }
}

export type RepoCardDeployment = FetchedData & {
  isDeployed: boolean
}

export type FetchedData = {
  accessTime: number
}

export type RepoListNames = {
  accessTime: number
  names: Array<{ name: string }>
}
