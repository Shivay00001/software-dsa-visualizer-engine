
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function SortingVisualizer() {
    const [array, setArray] = useState<number[]>([])
    const [isSorting, setIsSorting] = useState(false)

    useEffect(() => {
        resetArray()
    }, [])

    const resetArray = () => {
        if (isSorting) return
        const newArray = []
        for (let i = 0; i < 20; i++) {
            newArray.push(Math.floor(Math.random() * 80) + 10)
        }
        setArray(newArray)
    }

    const bubbleSort = async () => {
        setIsSorting(true)
        const arr = [...array]
        const n = arr.length

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap
                    const temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                    setArray([...arr])
                    await new Promise(resolve => setTimeout(resolve, 100))
                }
            }
        }
        setIsSorting(false)
    }

    return (
        <div className="visualizer-container">
            <div className="controls">
                <button onClick={resetArray} disabled={isSorting}>Generate New Array</button>
                <button onClick={bubbleSort} disabled={isSorting}>Bubble Sort</button>
            </div>

            <div className="array-container">
                <AnimatePresence>
                    {array.map((value, idx) => (
                        <motion.div
                            key={idx}
                            layout
                            className="array-bar"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0, height: `${value}%` }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        >
                            <span className="bar-value">{value}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}
