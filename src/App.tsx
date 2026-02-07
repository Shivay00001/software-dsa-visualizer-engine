
import { Code2, BarChart2 } from 'lucide-react'
import './App.css'
import { SortingVisualizer } from './components/SortingVisualizer'

function App() {
    return (
        <div className="app-container">
            <header className="app-header">
                <div className="logo">
                    <Code2 className="icon" />
                    <h1>DSA Visualizer Engine</h1>
                </div>
                <nav>
                    <span className="active"><BarChart2 className="icon-sm" /> Sorting</span>
                    <span>Graph Algorithms</span>
                    <span>Trees</span>
                </nav>
            </header>

            <main>
                <SortingVisualizer />
            </main>
        </div>
    )
}

export default App
