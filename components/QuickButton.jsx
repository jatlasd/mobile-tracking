import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const QuickButton = ({displayText, handlePress, otherStyles}) => {
  return (
<TouchableOpacity
    className={`bg-tiffany-500 p-5 m-3 rounded-xl ${otherStyles}`}
    onPress={handlePress}
    activeOpacity={0.7}
    value={displayText}
>
    <Text className='font-psemi text-dark-blue-2'>{displayText}</Text>
</TouchableOpacity>
  )
}

export default QuickButton