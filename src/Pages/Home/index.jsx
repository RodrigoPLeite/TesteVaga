import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Box } from './styles';

const Home = () => {
    
    const navigate = useNavigate();
    const [clienteId, setClienteId] = useState("");          
    const [cliente, setCliente] = useState("");
    const [container, setContainer] = useState("");
    const [tipo, setTipo] = useState("");
    const [status, setStatus] = useState("");
    const [categoria, setCategoria] = useState("");

    const handleSubmit = () => {
        Axios.post("http://localhost:3001/gravar", {
            clienteId: clienteId,
            container: container,
            tipo: tipo,
            status: status,
            categoria: categoria,
        })
        .then((res) => {
            console.log(res);
        })
        navigate(`/movimentacao/${clienteId}`);
    }

    const handlePesquisar = (id) => {
        setClienteId(id);
        Axios.get(`http://localhost:3001/clientes/${id}`)
        .then((res) => {
            setCliente(res.data.map(c => c.nome));
        })
    }

    const handleValidar = (valor) => {
        let regex = /[a-zA-Z]{4}[0-9]{7}/gm;
        if(valor.match(regex)){
            setContainer(valor);
        }else{
            alert("O container tem que ser composto por 4 letras e 7 números.")
        }
    }

    return ( 
        <Container>
            <form>
                <h1>Crud Container</h1>
                <label id="labelCliente" name="labelCliente">Cliente</label>
                <input id="clienteId" 
                       type="number"
                       name="clienteId"
                       value={clienteId}
                       onChange={(e) => handlePesquisar(e.target.value)}
                       style={{ marginLeft: '30px', marginRight: '10px'}}
                >
                </input>
                <input id="cliente" 
                       type="text"
                       name="cliente"
                       value={cliente}
                       onChange={(e) => setCliente(e.target.value)}
                       style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px'}}
                >
                </input>
                <label id="labelCliente" name="labelCliente">Container</label>
                <input id="container" 
                       type="text"
                       name="container"
                       value={container}
                       onChange={(e) => setContainer(e.target.value)}
                       onBlur={(e) => handleValidar(e.target.value)}
                       maxLength={11}
                       style={{ marginLeft: '10px', marginRight: '10px'}}
                >
                </input>
                <h3 style={{margin: '30px'}}>Tipo</h3>
                <label style={{marginLeft: '30px'}}>20</label>
                <input id="tipo20" 
                       type="radio"
                       name="grupo1"
                       value={20}
                       onChange={(e) => setTipo(e.target.value)}
                >
                </input>
                <label style={{marginLeft: '30px'}}>40</label>
                <input id="tipo40" 
                       type="radio"
                       name="grupo1"
                       value={40}
                       onChange={(e) => setTipo(e.target.value)}
                >
                </input>
                <h3 style={{margin: '30px'}}>Status</h3>
                <label style={{marginLeft: '30px'}}>Cheio</label>
                <input id="cheio" 
                       type="radio"
                       name="grupo2"
                       value={"cheio"}
                       onChange={(e) => setStatus(e.target.value)}
                >
                </input>
                <label style={{marginLeft: '30px'}}>Vazio</label>
                <input id="vazio" 
                       type="radio"
                       name="grupo2"
                       value={"vazio"}
                       onChange={(e) => setStatus(e.target.value)}
                >
                </input>
                <h3 style={{margin: '30px'}}>Categoria</h3>
                <label style={{marginLeft: '30px'}}>Importação</label>
                <input id="importacao" 
                       type="radio"
                       name="grupo3"
                       value={"importacao"}
                       onChange={(e) => setCategoria(e.target.value)}
                >
                </input>
                <label style={{marginLeft: '30px'}}>Exportação</label>
                <input id="exportacao" 
                       type="radio"
                       name="grup3"
                       value={"exportacao"}
                       onChange={(e) => setCategoria(e.target.value)}
                >
                </input>
            </form>
            <Box>
                <button style={{marginBottom: '30px'}} onClick={handleSubmit}>Cadastrar</button>
                <button style={{marginBottom: '30px'}} onClick={() => navigate("/relatorios")}>Relatórios</button>
            </Box>
        </Container>
     );
}
 
export default Home;