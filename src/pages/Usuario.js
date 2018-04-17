import React, { Component } from 'react';
import { Input } from '../component/Input';
import { map } from 'lodash';
import {
  Button,
  Container,
  Form,
  Col,
  Row,
  Table
} from 'reactstrap';
import validator from 'validator';
let axios = require('axios');


export class Usuario extends Component {

  usuarios = []
  state = {
    usuarios: [

    ]
  }
  componentDidMount() {
    this.buscarUsuarios();
  }
  buscarUsuarios() {
    axios.get('/api/usuarios')
      .then((response) => {
        this.setState({
          usuarios: response.data
        })
      })
  }
  onInputChange = (event) => {
    const { id, value } = event.target;
    const state = {};
    state[id] = value;
    this.setState(state);
  }

  editarUsuario(id) {
    alert(id)
  }
  excluirUsuario(id) {
    axios.delete(`/api/usuarios/${id}`)
    .then((response) => {
      this.buscarUsuarios();
    })
  }

  onInputChange = (event) => {
    const { id, value } = event.target;
    const state = {};
    state[id] = value;
    this.setState(state);
  }
  renderUsuarios() {
    return map(this.state.usuarios, (item) => {
      return (
        <tr>
          <th scope="row">{item.id}</th>
          <td>{item.email}</td>
          <td>
            <Col>
              <Button outline onClick={() => {
                this.editarUsuario(item.id)
              }} >Editar</Button>
            </Col>
          </td>
          <td>
            <Col>
              <Button color="danger" outline
                onClick={() => {
                  this.excluirUsuario(item.id)
                }} >Excluir</Button>
            </Col>
          </td>
        </tr>
      )
    })
  }
  onEmailvalidate(e) {
    return validator.isEmail(e)
  }
  onSenhaValidate(e) {
    return validator.isLength(e, {min:6, max: undefined})
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    if(this.isFormValid(this.refs)){
      this.cadastrarUsuario();
    }
  }
  cadastrarUsuario = () => {
    const { senha, email } = this.state;
    axios.post('/api/usuarios',
      {
        senha, email,
      })
      .then((response) => {
        this.buscarUsuarios();
      })

  }
  isFormValid = (refs) => {
    const formValid = Object.keys(refs) 
      .map(refName => refs[refName]) 
      .filter(component => component instanceof Input)
      .reduce((previousValid, input) => {
        console.log(input);
        return input.isValid() && previousValid;
      }, true);
    return formValid;
  }

  render() {
    const { email, senha } = this.state;

    return (
      <Container>
        <Form onSubmit={this.onFormSubmit}>
          <Input label="Email" id="email" ref="inputEmail" required={true} value={email}
            onChange={this.onInputChange} errorMessage="O email é obrigatório."
            validator={this.onEmailvalidate} />

          <Input label="Senha" type="password" id="senha" ref="inputSenha" required={true} value={senha}
            onChange={this.onInputChange} errorMessage="A senha deve ser maior que 6"
            validator={this.onSenhaValidate} />

          <Row>
            <Col sm={12} lg={12}>

              <div className="float-right">
                <Button color="success" outline >Salvar</Button>
              </div>

            </Col>
          </Row>
        </Form>
        
        <Row>
        <Col xs={12}>
        
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Editar</th>
                  <th>Excluir</th>
                </tr>
              </thead>
              <tbody>
                {this.renderUsuarios()}
              </tbody>
            </Table>
        </Col>
        </Row>
      </Container>

    );
  }
}

