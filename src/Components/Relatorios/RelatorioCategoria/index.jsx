import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {Container, Menu } from './styles';

const RelatorioCategoria = () => {
    const [container, setContainer] = useState([]);
    const [filtro, setFiltro] = useState([]);
    const [count, setCount] = useState(0);
    const [selectValue, setSelectValue] = useState("Importação");
    const list = [
        { id: 1, name: "Importação"},
        { id: 2, name: "Exportação"},
    ];
    const [importacao, setImportacao] = useState(0);
    const [exportacao, setExportacao] = useState(0);

    useEffect(() => {
        Axios.get("http://localhost:3001/container")
        .then((res) => {
            setContainer(res.data);
        })
    }, []);

    const handleMovimentacao = () => {
        Axios.get(`http://localhost:3001/categoria/${selectValue}`)
        .then((res) => {
            setFiltro(res.data);
            setCount(res.data.length);
            if(selectValue !== "Importação") {
                setImportacao(container.length - res.data.length);
                setExportacao(res.data.length);
            }else{
                setImportacao(res.data.length);
                setExportacao(container.length - res.data.length);

            }
        })
    }

    return(
        <Container>
            <Menu>
                <select value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                    {list.map((item, index) => (
                        <option value={item.name}>{item.name}</option>
                    ))}
                </select>
                <button onClick={handleMovimentacao}>Movimentação</button>
            </Menu>
            <p>Total Categoria: {(importacao + exportacao)} registros sendo {importacao} Importações e {exportacao} Exportações.</p>
            <ul>
                <table style={{textAlign: 'center'}}>
                    <thead>
                        <tr>
                            <td>Total de Movimentações: {count}</td>
                        </tr>
                        <tr>
                            <th>Cliente</th>
                            <th>Nº Container</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            filtro.map(c => (
                                <tr>
                                    <td>{c.nome}</td>
                                    <td>{c.numeroContainer}</td>
                                    <td>{c.categoria}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </ul>
        </Container>
    );
     
}
 
export default RelatorioCategoria;