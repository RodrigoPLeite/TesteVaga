import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Container, Menu } from './styles';

const RelatoriosAgrupados = () => {
    const [agrupados, setAgrupados] = useState([]);
    const [agrupadosMovimentacao, setAgrupadosMovimentacao] = useState([]);
    const [selectValueCliente, setSelectValueCliente] = useState(1);
    const [clientes, setClientes] = useState([]);
    const [selectValue, setSelectValue] = useState(1);
    const [countAgrupados, setCountAgrupados] = useState(0);
    const [count, setCount] = useState(0);
    const list = [
        { id: 1, name: 'Embarque'},
        { id: 2, name: 'Descarga'},
        { id: 3, name: 'Gate In'},
        { id: 4, name: 'Gate Out'},
        { id: 5, name: 'Reposicionamento'},
        { id: 6, name: 'Pesagem'},
        { id: 7, name: 'Scanner'},
    ];

    useEffect(() => {
        Axios.get("http://localhost:3001/clientes")
        .then((res) => {
            setClientes(res.data);
        })
    }, []);

    const handleAgrupadosClientes = () => {
        Axios.get(`http://localhost:3001/agrupados/${selectValueCliente}`)
        .then(res => {
            setAgrupados(res.data);
            setCountAgrupados(res.data.length);
        })
    }

    const handleAgrupadosMovimentacao = () => {
        Axios.get(`http://localhost:3001/agrupadosMovimentacao/${selectValue}`)
        .then((res) => {
            setAgrupadosMovimentacao(res.data);
            setCount(res.data.length);
        })
    }

    return ( 
        <Container>
            <Menu>
              <select value={selectValueCliente} onChange={e => setSelectValueCliente(e.target.value)}>
                {clientes.map((cliente, index) => (
                    <option value={cliente.id}>{cliente.nome}</option>
                ))}
              </select>
              <button onClick={handleAgrupadosClientes}>Agrupados Clientes</button> 
            </Menu>
            <ul>
                <table style={{textAlign: 'center'}}>
                    <thead>
                        <tr>
                            <td>Total de Movimentações: {count}</td>
                        </tr>
                        <tr>
                            <th>Cliente</th>
                            <th>Nº Container</th>
                            <th>Movimentação</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            agrupados.map(c => (
                                <tr>
                                    <td>{c.nome}</td>
                                    <td>{c.numeroContainer}</td>
                                    {list.filter(m => m.id === c.tipoMovimentacao).map(n => (
                                        <td>{n.name}</td>
                                    ))}
                                    <td>{c.categoria}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </ul>
            <Menu>
              <select value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                {list.map((item, index) => (
                    <option value={item.id}>{item.name}</option>
                ))}
              </select>
              <button onClick={handleAgrupadosMovimentacao}>Agrupados Movimentacao</button> 
            </Menu>
            <ul>
                <table style={{textAlign: 'center'}}>
                    <thead>
                        <tr>
                            <td>Total de Movimentações: {count}</td>
                        </tr>
                        <tr>
                            <th>Cliente</th>
                            <th>Nº Container</th>
                            <th>Movimentação</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            agrupadosMovimentacao.map(c => (
                                <tr>
                                    <td>{c.nome}</td>
                                    <td>{c.numeroContainer}</td>
                                    {list.filter(m => m.id === c.tipoMovimentacao).map(n => (
                                        <td>{n.name}</td>
                                    ))}
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
 
export default RelatoriosAgrupados;