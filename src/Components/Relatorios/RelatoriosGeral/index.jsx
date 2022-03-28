import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Container } from './styles';

const RelatorioGeral = () => {
    
    const [container, setContainer] = useState([]);
    const [count, setCount] = useState('');
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
        Axios.get("http://localhost:3001/container")
        .then((res) => {
            setContainer(res.data);
        })
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/totalMovimentacao")
        .then((res) => {
            setCount(res.data.map(c => c.qtd))
        })
    }, []);

    return ( 
        <Container>
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
                            container.map(c => (
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
 
export default RelatorioGeral;