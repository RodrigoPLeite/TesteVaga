import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from './styles';

const Movimentacao = () => {

    const navigate = useNavigate();
    const [selectValue, setSelectValue] = useState(1);
    const [clienteId, setClienteId] = useState('');
    const list = [
        { id: 1, name: 'Embarque'},
        { id: 2, name: 'Descarga'},
        { id: 3, name: 'Gate In'},
        { id: 4, name: 'Gate Out'},
        { id: 5, name: 'Reposicionamento'},
        { id: 6, name: 'Pesagem'},
        { id: 7, name: 'Scanner'},
    ];

    const [dataInicio, setDataInicio] = useState('');
    const [dataInicioFormatada, setDataInicioFormatada] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [dataFimFormatada, setDataFimFormatada] = useState('');
    const { nome } = useParams();

    const handleSelectInicio = (e) => {
        e.preventDefault();
        var data = new Date();
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth()+1).padStart(2, '0');
        var ano = data.getFullYear();
        var dataInicio = ano + '-' + mes + '-' + dia + ' ' + data.getHours() + ':' + data.getMinutes().toString().padStart(2, '0') + ':' + data.getSeconds().toString().padStart(2, '0');
        setDataInicio(dataInicio);
        setDataInicioFormatada(dia + '/' + mes + '/' + ano + ' - ' + data.getHours() + ':' + data.getMinutes().toString().padStart(2, '0') + ':' + data.getSeconds().toString().padStart(2, '0'));
        setDataFim('Aperte o botão para dar fim a movimentação');
    }

    const handleSelectFim = (e) => {
        e.preventDefault();
        var data = new Date();
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth()+1).padStart(2, '0');
        var ano = data.getFullYear();
        var dataFim = ano + '-' + mes + '-' + dia + ' ' + data.getHours() + ':' + data.getMinutes().toString().padStart(2, '0') + ':' + data.getSeconds().toString().padStart(2, '0');
        setDataFim(dataFim);
        setDataFimFormatada(dia + '/' + mes + '/' + ano + ' - ' + data.getHours() + ':' + data.getMinutes().toString().padStart(2, '0') + ':' + data.getSeconds().toString().padStart(2, '0'));
    }

    const handleGravar = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/gravarMovimentacao", {
            clienteId: nome,
            tipoMovimentacao: selectValue,
            dataInicio: dataInicio,
            dataFim: dataFim,
        })
        alert("Salvo no banco de dados");
        navigate('/');
    }

    return ( 
        <Container>
            <h3>CRUD MOVIMENTAÇÃO</h3>
            <h2>Tipo de Movimentação</h2>
            <h2>Cliente: {nome}</h2>
            <select value={selectValue}
            onChange={e => setSelectValue(e.target.value)}
            >
                {list.map((item, index) => (
                    <option value={item.id}>{item.name}</option>
                ))}
            </select>
            <h2>Data e Hora de Início</h2>
            <span>{dataInicioFormatada}</span>
            <button onClick={handleSelectInicio}>Início da Movimentação</button>
            <h2>Data e Hora de Fim</h2>
            <span>{dataFimFormatada}</span>
            <button onClick={handleSelectFim}>Fim da Movimentação</button>
            <button onClick={handleGravar}>Gravar Movimentação</button>
            <button onClick={() => navigate('/')}>Home</button>
        </Container>
     );
}
 
export default Movimentacao;