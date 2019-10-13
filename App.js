import React, { Component } from 'react';
import { Content, Row, Col, Grid, View, Text, Header, Body, Title, Button, Container } from 'native-base';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venta: 0.00,
      ton: 0.00,
      costo: 0.00,
      utilidad: '0.00 %',
      results: []
    }
  }

  setResults = (r) => {
    let arr = [];
    r.forEach(d => {
      arr.push(<Grid style={{backgroundColor:'#E6E6E6'}}>
        <Row style={{ flex:1,flexDirection:'row',marginBottom:15,marginTop:15 }}>
          <Text style={{ flex:1,flexDirection:'column' }}>Venta</Text>
          <Text style={{ flex:1,flexDirection:'column' }}>{d.Venta}</Text>
        </Row>
        <Row style={{ flex:1,flexDirection:'row',marginBottom:15 }}>
          <Text style={{ flex:1,flexDirection:'column' }}>Ton</Text>
          <Text style={{ flex:1,flexDirection:'column' }}>{d.Ton}</Text>
        </Row>
        <Row style={{ flex:1,flexDirection:'row',marginBottom:15 }}>
          <Text style={{ flex:1,flexDirection:'column' }}>Costo</Text>
          <Text style={{ flex:1,flexDirection:'column' }}>{d.Costo}</Text>
        </Row>
        <Row style={{ flex:1,flexDirection:'row',marginBottom:15 }}>
          <Text style={{ flex:1,flexDirection:'column' }}>Utilidad</Text>
          <Text style={{ flex:1,flexDirection:'column' }}>{d.Utilidad}</Text>
        </Row>
      </Grid>)
    });
    console.log(arr);
    this.setState({
      results: arr
    })
  }

  obtenerDatos = () => {

    return new Promise((resolve, reject) => {
      fetch('http://200.0.91.165:3000/api/sales/complete', {
        method: 'GET'
      })
        .then((res) => res.json())
        .then(d => {
          this.setResults(d);
        })
        .catch((e) => {
          console.error(e.message);
        });
    });

  }

  render() {
    return (
      <Content scrollEnabled={true}>
        <Header style={{ backgroundColor: '#C6C6C6' }}>
          <Body>
            <Title>Consumir Rest</Title>
          </Body>
        </Header>
        <Grid style={{margin:10}}>
          <Row style={{ alignItems: 'center', height: 50, justifyContent: 'space-evenly', flexDirection: 'row' }}>
            <Col>
              <Button style={{ margin:5,justifyContent: 'center' }} onPress={() => this.obtenerDatos()}>
                <Text> OBTENER DATA</Text>
              </Button>
            </Col>
            <Col>
              <Button style={{ margin:5,justifyContent: 'center' }} onPress={() => this.setState({ results:[] } )}>
                <Text> LIMPIAR</Text>
              </Button>
            </Col>
          </Row>
          <Row style={{ alignItems: 'center', height: 50, justifyContent: 'space-evenly', marginTop: 20, flexDirection: 'row' }}>
            <Col>
              <Text>Resultados:</Text>
            </Col>
          </Row>
          {this.state.results}
        </Grid>        
      </Content>
    )
  }
}