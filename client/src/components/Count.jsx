import React, { useCallback, useEffect, useMemo } from "react";
import './count.css'
function Count(){
    const [count,setCount] = React.useState(0)

    // useEffect()
    // useCallback()
    // useMemo()

    const increaseCount = () => {
        setCount(count + 1)
    }

    return (<><div className="test">Count - {count}</div><button onClick={increaseCount}>Click me</button></>)
}

export default Count;