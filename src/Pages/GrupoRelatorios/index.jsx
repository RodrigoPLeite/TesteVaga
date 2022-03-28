import { useNavigate } from 'react-router-dom';
import RelatorioCategoria from '../../Components/Relatorios/RelatorioCategoria';
import RelatorioGeral from '../../Components/Relatorios/RelatoriosGeral';
import RelatorioComFiltro from '../../Components/Relatorios/RelatorioComFiltro';
import RelatoriosAgrupados from '../../Components/Relatorios/RelatoriosAgrupados';
import { Container } from './styles';

const GrupoRelatorios = () => {

    const navigate = useNavigate();
    return ( 
        <Container>
            <h2>Relatórios</h2>
            <button style={{marginBottom: '10px'}} onClick={() => navigate('/')}>Voltar</button>
            <RelatorioGeral />
            <RelatorioCategoria />
            <RelatorioComFiltro />
            <RelatoriosAgrupados />
        </Container>
     );
}
 
export default GrupoRelatorios;