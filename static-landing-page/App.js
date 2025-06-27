import React from 'react';
import data from './data';
import { Card, Col, Layout ,Row } from 'antd';
import Typography from 'antd/es/typography/Typography';
import filo from './no.json'

const App = () => {
  console.log(data);

  
  const travelCards = data.map((item) => {
    return (
        
    <Col style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',}}>
      <Card >
<img src={item.img.src} style={{
   width : '300px'
}}></img>
<h2>{item.title}</h2>
<a href={item.googleMapsLink} target='_blank' rel="noreferrer"> View on Google Maps</a>
 <p>{item.dates}</p>
      </Card>

      </Col>

      
    );
  });

  return (
    <>
      <Layout>
        <Layout.Header
          className="tittle"
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <Typography
            style={{
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              fontSize: '30px',
            }}
          >
            My Travel Journal
          </Typography>
        </Layout.Header>
        <Layout.Content
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          {travelCards}
          
        </Layout.Content>
   
      </Layout>
    </>
  );
};

export default App;
