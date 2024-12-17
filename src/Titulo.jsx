import { useState } from "react";

function Titulo({children}){

    const [tabuleiro, setTabuleiro] = useState(["_", "_", "_", "_", "_", "_", "_", "_", "_"]);
    const [jogador, setJogador] = useState("x");
    const [vencedor, setVencedor] = useState(null);
    const [empate, setEmpate] = useState(0);

    function Reiniciar(){
        setTabuleiro(["_", "_", "_", "_", "_", "_", "_", "_", "_"]);
        setJogador("x");
        setVencedor(null);
        setEmpate(0);
    }

    function verificarVencedor(tabuleiroAtual){
        const vitorias = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for(let i = 0; i < vitorias.length; i++){
            const [a, b, c] = vitorias[i];
            if(tabuleiroAtual[a] === tabuleiroAtual[b] && tabuleiroAtual[a] === tabuleiroAtual[c] && tabuleiroAtual[a]!== "_"){
                setVencedor(tabuleiroAtual[a]);
                return;
            }
        }
    }

    function Marcar(index){
        if(tabuleiro[index] !== "_" || vencedor) return;
        const novoTabuleiro = [...tabuleiro]
        novoTabuleiro[index] = jogador;

        setTabuleiro(novoTabuleiro);
        setEmpate(empate + 1);
        setJogador((anterior) => (anterior === "x" ? "o" : "x"));
        
        verificarVencedor(novoTabuleiro);
    }

    return(
    <div>
    <h1>Jogo da Velha</h1>
    {vencedor ? <h2>Vencedor: Jogador {vencedor}</h2> : (empate === 9 ? <h2>Deu velha!</h2> : <h2>Vez do jogador: {jogador}</h2>)}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)", gap: "10px" }}>
            {tabuleiro.map((valor,index) => (
                <button key={index} onClick={() => Marcar(index)}>
                    {valor === "_" ? "_" : valor}
                </button>)
            )}            
        </div>
        <br/>
        <div>
            <button onClick={Reiniciar}>Reiniciar</button>
        </div>
    </div>
    )
}

export default Titulo;