import React from 'react';

import { Container, Header, Body, Card, Footer } from './styles';

import place_icon from '../../../assets/place_icon.svg'

const DashboardHistory = () => {

  const data = [
    {
      date: '20/04/2020',
      local: 'Cook Islands',
      name: 'Claire Richards',
      value: 50,
    },
    {
      date: '20/04/2020',
      local: 'Cook Islands',
      name: 'Claire Richards',
      value: 50,
    },
    {
      date: '20/04/2020',
      local: 'Cook Islands',
      name: 'Claire Richards',
      value: 50,
    },
    {
      date: '20/04/2020',
      local: 'Cook Islands',
      name: 'Claire Richards',
      value: 50,
    },
    {
      date: '20/04/2020',
      local: 'Cook Islands',
      name: 'Claire Richards',
      value: 50,
    },
    {
      date: '20/04/2020',
      local: 'Cook Islands',
      name: 'Claire Richards',
      value: 50,
    },
    {
      date: '20/04/2020',
      local: 'Cook Islands',
      name: 'Claire Richards',
      value: 50,
    },
    {
      date: '20/04/2020',
      local: 'Cook Islands',
      name: 'Claire Richards',
      value: 50,
    },
    {
      date: '20/04/2020',
      local: 'Cook Islands',
      name: 'Claire Richards',
      value: 50,
    },
  ]

  var formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Container>
      <Header>
        Histórico de transações
      </Header>
      <Body>
        {
          data.map(item => (
            <Card key={data.indexOf(item)}>
              <h5>{item.date}</h5>
              <div>
                <div>
                  <img src={place_icon} alt='Localização' />
                  <h4>{item.local}</h4>
                </div>
                <div>
                  <h4>{item.name}</h4>
                  <h4>{formatter.format(item.value)}</h4>
                </div>
              </div>
            </Card>
          ))
        }
      </Body>
      <Footer>
        <button>
          +ADICIONAR FUNDOS
        </button>
      </Footer>
    </Container>
  )
}

export default DashboardHistory;