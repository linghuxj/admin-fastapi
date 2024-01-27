export interface UserLoginType {
  telephone: string
  password: string
  method: string
  platform?: string
}

export interface UserType {
  telephone: string
  nickname: string
  id: number
  avatar: string
  name: string
}
