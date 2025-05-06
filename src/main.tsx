
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log("Aplicação carregando - verificando se os scripts estão sendo executados.");

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Elemento raiz não encontrado!");
} else {
  createRoot(rootElement).render(<App />);
}
