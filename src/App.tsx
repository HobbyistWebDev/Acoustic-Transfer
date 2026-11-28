import styles from "./App.module.css"
import Encoder from "./components/encoder/Encoder"
import Decoder from "./components/decoder/Decoder"
import Header from "./components/header/Header"

function App()
{
  return <div className={styles.App}>
    <Header/>
    <Encoder/>
    <Decoder/>
  </div>
}

export default App