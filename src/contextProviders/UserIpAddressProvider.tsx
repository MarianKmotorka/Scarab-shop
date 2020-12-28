import { createContext, FC, useContext, useEffect, useState } from 'react'
import { isValidIp } from '../utils/utils'

interface IUserIpAddressContextValue {
  ip?: string
}

const UserIpAddressContext = createContext<IUserIpAddressContextValue>(null!)
export const useUserIpAddress = () => useContext(UserIpAddressContext)

const UserIpAddressProvider: FC = ({ children }) => {
  const [ip, setIp] = useState<string>()

  useEffect(() => {
    const fetchIp = async () => {
      const response = await fetch('https://api.ipify.org/?format=json')
      const json = await response.json()
      isValidIp(json.ip) && setIp(json.ip)
    }

    fetchIp()
  }, [])

  return (
    <UserIpAddressContext.Provider value={{ ip }}>
      {children}
    </UserIpAddressContext.Provider>
  )
}

export default UserIpAddressProvider
