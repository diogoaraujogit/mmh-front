import React, { useState, useMemo, useCallback } from 'react';
import { Form } from '@rocketseat/unform'
import Layout from '../../components/layout'
import { Container, Header, Line, Footer } from './styles';
import FormInput from '../../components/Input';
import FormSelect from '../../components/Select';
import * as Yup from 'yup';
import FormRadio from '../../components/Radio';
import FormCheck from '../../components/Check'
import api from '../../services/api'

const Profile = () => {

	const [married, setMarried] = useState(false)
	const [employed, setEmployed] = useState(true)
	const [ownBusiness, setOwnBusiness] = useState(true)
	const [activities, setActivities] = useState(true)
	const [typeActivities, setTypeActivities] = useState(['Online', 'Presencial'])

	const neighborhoods = useMemo(() => 
		[
			'Adrianópolis'
			, 'Águas Claras'
			, 'Aleixo'
			, 'Alfredo Nascimento'
			, 'Alvorada'
			, 'Alvorada 2'
			, 'Amadeu Botelho'
			, 'Aparecida'
			, 'Armando Mendes'
			, 'Betânia'
			, 'Cachoeirinha'
			, 'Campos Sales'
			, 'Centro'
			, 'Chapada'
			, 'Cidade de Deus'
			, 'Cidade Nova'
			, 'Cidade Nova 2'
			, 'Cidade Nova 3'
			, 'Cidade Nova 5'
			, 'Colônia Antônio Aleixo'
			, 'Colônia Cachoeira Grande'
			, 'Colônia Oliveira Machado'
			, 'Colônia Santo Antônio'
			, 'Colônia Terra Nova'
			, 'Compensa 1'
			, 'Compensa 2'
			, 'Compensa 3'
			, 'Conjunto João Paulo II'
			, 'Coroado'
			, 'Crespo'
			, 'Da Paz'
			, 'Distrito Industrial 1'
			, 'Distrito Industrial 2'
			, 'Dom Pedro'
			, 'Educandos'
			, 'Fazendinha'
			, 'Flores'
			, 'Francisca Mendes'
			, 'Gilberto Mestrinho'
			, 'Glória'
			, 'Grande Vitória'
			, 'Japiim'
			, 'Jorge Teixeira'
			, 'Lago Azul'
			, 'Lírio do Vale'
			, 'Lírio do Vale 2'
			, 'Mauazinho'
			, 'Monte das Oliveiras'
			, 'Monte Pascoal'
			, 'Morro da Liberdade'
			, 'Nossa Senhora Aparecida'
			, 'Nossa Senhora das Graças'
			, 'Nova Cidade'
			, 'Nova Floresta'
			, 'Nova Vitória'
			, 'Nova Esperança'
			, 'Novo Aleixo'
			, 'Novo Israel'
			, 'Novo Reino'
			, 'Parque 10 de Novembro'
			, 'Parque das Laranjeiras'
			, 'Parque das Nações'
			, 'Petrópolis'
			, 'Planalto'
			, 'Ponta Negra'
			, 'Praça 14 de Janeiro'
			, 'Presidente Vargas'
			, 'Puraquequara'
			, 'Raiz'
			, 'Redenção'
			, 'Santa Etelvina'
			, 'Santa Inês'
			, 'Santa Luzia'
			, 'Santo Agostinho'
			, 'Santo Antônio'
			, 'São Francisco'
			, 'São Geraldo'
			, 'São Jorge'
			, 'São José Operário'
			, 'São Lázaro'
			, 'São Raimundo'
			, 'Tancredo Neves'
			, 'Tarumã'
			, 'Tarumã-Açu'
			, 'Valparaíso'
			, 'Vila Buriti'
			, 'Vila da Prata'
			, 'Zumbi dos Palmares'
		], [])

	const neighborhoodsObj = useMemo(() => neighborhoods.map(neighborhood => {
		var obj = {}
		obj.id = neighborhoods.indexOf(neighborhood) + 1
		obj.title = neighborhood

		return obj
	}), [neighborhoods])

	const marialStatus = useMemo(() => [
		{ id: '1', title: 'Casado(a)' },
		{ id: '2', title: 'Divorciado(a)' },
		{ id: '3', title: 'Separado(a)' },
		{ id: '4', title: 'Solteiro(a)' },
		{ id: '5', title: 'União estável' },
		{ id: '6', title: 'Viúvo(a)' }
	], [])

	const houseStatus = useMemo(() => [
		{ id: '1', title: 'Própria' },
		{ id: '2', title: 'Alugada' },
		{ id: '3', title: 'Parente/Amigo' }
	], [])

	const job = useMemo(() => [
		{ id: '1', title: 'CLT' },
		{ id: '2', title: 'Autônomo' }
	], [])

	const schema = Yup.object().shape({
		name: Yup.string().required('O nome é obrigatório'),
		email: Yup.string()
			.email('Insira um e-mail válido')
			.required('O e-mail é obrigatório'),
		cpf: Yup.string()
			.required('O CPF é obrigatório')
			.min(14, 'Insira o CPF completo'),
		mobile: Yup.string()
			.required('O número de celular é obrigatório')
			.min(15, 'Insira o número no formato correto'),
		birth: Yup.string()
			.required('A data de nascimento é obrigatória')
			.min(10, 'Insira a data corretamente'),
		marial: Yup.string().required('O estado civil é obrigatório'),
		partner_name: married === '1' ? Yup.string()
			.required('O nome do cônjuge é obrigatório') :
			Yup.string(),
		partner_cpf: married === '1' ? Yup.string()
			.required('O CPF do cônjuge é obrigatório')
			.min(14, 'Insira o CPF completo') :
			Yup.string(),
		address: Yup.string()
			.required('O endereço é obrigatório'),
		cep: Yup.string()
			.min(9, 'Insira o CEP completo')
			.required('O CEP é obrigatório'),
		house_number: Yup.string()
			.required('O número da casa é obrigatório'),
		compl: Yup.string(),
		neighborhood: Yup.string()
			.required('O bairro é obrigatório'),
		nation: Yup.string()
			.required('A nacionalidade é obrigatória'),
		coliving: Yup.string(),
		house_status: Yup.string(),
		income: Yup.string(),
	});

	const handleSubmit = useCallback((data) => {

		const birth = `${data.birth.slice(-4)}-${data.birth.slice(4, 6)}-${data.birth.slice(0, 2)}`
		const date = new Date()

		const body = {
			"parceiro_id": 1,
			"nome": data.name,
			"cpf": data.cpf,
			"email": data.email,
			"data_nascimento": birth,
			"trabalho": data.job,
			"esta_desempregado": employed,
			"estado_civil_id": data.marial,
			"nome_conjuge": data.partner_name,
			"cpf_conjuge": data.partner_cpf,
			"total_residentes": data.coliving,
			"situacao_moradia": data.house_status,
			"renda_mensal": data.income,
			"gostaria_montar_negocio": ownBusiness,
			"gostaria_participar_cursos": activities,
			"tipo_curso": typeActivities,
			"concorda_informacoes_verdadeiras": true,
			"data_submissao": date, //"2020-05-26 10:11:12"
			"telefones": [
				{
					"telefone": data.mobile,
					"tipo": "Celular"
				}
			],
			"enderecos": [
				{
					"endereco": date.address,
					"numero": date.house_number,
					"complemento": date.compl,
					"bairro_id": date.neighborhood,
					"zona_id": null,
					"cep": date.cep,
					"cidade_id": 1
				}
			]
		}

		handlePostBenefited(body)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const mask = useCallback((i, type) => {
		var v = i.value;

		if (isNaN(v[v.length - 1])) { // impede entrar outro caractere que não seja número
			i.value = v.substring(0, v.length - 1);
			return;
		}


		if (type === 'cep') {
			i.setAttribute("maxlength", "9"); // Máximo de 9 caracteres
			if (v.length === 5) i.value += "-";
		}

		if (type === 'cpf') {
			i.setAttribute("maxlength", "14"); // Máximo de 14 caracteres
			if (v.length === 3 || v.length === 7) i.value += ".";
			if (v.length === 11) i.value += "-";
		}

		if (type === 'date') {
			i.setAttribute("maxlength", "10"); // Máximo de 08 caracteres
			if (v.length === 2) i.value += '/';
			if (v.length === 5) i.value += "/";
		}

		if (type === 'mobile') {
			i.setAttribute("maxlength", "15"); // Máximo de 15 caracteres
			if (v.length === 1) i.value = '(' + v;
			if (v.length === 3) i.value += ") ";
			if (v.length === 10) i.value += "-";
		}

		if (type === 'money') {
			i.setAttribute("maxlength", "12"); // Máximo de 15 caracteres
			if (v.length === 1) i.value = 'R$ ' + v;
			if (v === 'R$ ') i.value = '';
		}
	}, [])

	async function handlePostBenefited(body) {
		try {
			const response = await api.post('/beneficiarios', body)

			if (response.data) {

			}

		} catch (err) {

		}
	}

	return (
		<Layout>
			<Container>
				<Header>
					<h2>Cadastro de Beneficiários</h2>
				</Header>
				<Form schema={schema} onSubmit={handleSubmit} >
					<Line>
						<FormInput label='Nome' name='name' placeholder='ex. João Pedro' required />
						<FormInput label='Email' name='email' placeholder='ex. example@example.com' required />
					</Line>
					<Line>
						<div className='halfgrid'>
							<FormInput label='CPF' name='cpf' placeholder='ex. 000.000.000-10' required onChange={event => mask(event.target, 'cpf')} />
							<FormInput label='Celular' name='mobile' placeholder='ex. (92) 99999-9999' required onChange={event => mask(event.target, 'mobile')} />
						</div>
						<div className='halfgrid'>
							<FormInput label='Data de Nascimento' name='birth' placeholder='ex. dd/mm/aaaa' required onChange={event => mask(event.target, 'date')} />
							<FormSelect
								label='Estado Civil'
								name='marial'
								options={marialStatus}
								onChange={event => setMarried(event.target.value)}
								required
							/>
						</div>
					</Line>
					{
						married === '1' ?
							<Line>
								<FormInput label='Nome do cônjuge' name='partner_name' placeholder='ex. João Pedro' required />
								<FormInput label='CPF do Cônjuge' name='partner_cpf' placeholder='ex. 000.000.000-10' required onChange={event => mask(event.target, 'cpf')} />
							</Line>
							:
							<></>
					}
					<Line>
						<FormInput label='Endereço' name='address' placeholder='Informe seu endereço' required />
						<FormInput label='CEP' name='cep' placeholder='ex. 69000-000' required onChange={event => mask(event.target, 'cep')} />
					</Line>
					<Line>
						<div className='halfgrid'>
							<FormInput label='Número' name='house_number' placeholder='ex. 28 B' required />
							<FormInput label='Complemento' name='compl' placeholder='ex. Próximo ao Shopping' />
						</div>
						<div className='halfgrid'>
							<FormSelect
								label='Bairro'
								name='neighborhood'
								options={neighborhoodsObj}
								required
							/>
							<FormInput label='Nacionalidade' name='nation' placeholder='ex. Brasileiro' required />
						</div>
					</Line>
					<Line>
						<div className='halfgrid'>
							<FormInput label='Pessoas em sua residência' type name='coliving' placeholder='ex. 3' onChange={event => mask(event.target, 'number')} />
							<FormSelect
								label='Situação de moradia'
								name='house_status'
								options={houseStatus}

							/>
						</div>
						<div className='halfgrid'>
							<FormRadio label='Trabalha?' required options={['Sim', 'Não']} value={employed} onChange={(status) => setEmployed(status)} />
							{
								employed &&
								<FormSelect
									label='Trabalho'
									name='job'
									options={job}
								/>
							}
						</div>
					</Line>
					<Line>
						<div className='halfgrid'>
							<FormInput label='Renda Mensal' name='income' placeholder='ex. R$ 1000' onChange={event => mask(event.target, 'money')} />
							<FormRadio label='Gostaria de montar um negócio?' options={['Sim', 'Não']} required value={ownBusiness} onChange={(status) => setOwnBusiness(status)} />
						</div>
						<div className='halfgrid'>
							<FormRadio label='Tem interesse em participar de cursos, palestras e oficinas?' options={['Sim', 'Não']} required value={activities} onChange={(status) => setActivities(status)} />
							{
								activities &&
								<FormCheck label='Quais tipos de cursos?' options={['Online', 'Presencial']} required value={typeActivities} onChange={(option, value) => {
									const elements = value.filter(element => element !== option)
									value.includes(option) ? setTypeActivities([...elements]) : setTypeActivities([...value, option])
								}} />

							}
						</div>
					</Line>
					<Footer>
						<button type='submit'>
							Salvar
						</button>
					</Footer>
				</Form>
			</Container>
		</Layout>
	)
}

export default Profile;
