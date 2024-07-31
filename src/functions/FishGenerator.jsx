import React from 'react'
import Fish from '../components/Fish'


export const fishGenerator = (arr) => {
    return arr.map((fish) => {
        return (
            <Fish
                name={fish.name}
                divClass={"bg-gray-200"}
                key={fish.name}
                waterType={fish.waterType}
                area={fish.area}
                DangerOfExtinction={fish.DangerOfExtinction}
                src={fish.image}
            />
        )
    })
}
