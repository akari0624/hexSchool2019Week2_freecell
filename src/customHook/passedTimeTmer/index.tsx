import { useState, useEffect, useRef } from 'react'

function usePassedTimeTimer() {
  const startTimeRef = useRef(Math.floor(Date.now() / 1000))
  const [passTimeNowStr, setPassTimeNowStr,] = useState('00:00')

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nowTime = Math.floor(Date.now() / 1000)
      const passesTime = nowTime - startTimeRef.current
      const minute = Math.floor(passesTime / 60)
      const second = passesTime % 60
      const minuteStr = minute < 10 ? '0' + minute : '' + minute
      const secondStr = second < 10 ? '0' + second : '' + second
      setPassTimeNowStr(minuteStr + ':' + secondStr)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return passTimeNowStr
}


export { usePassedTimeTimer }