import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useContext } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import BASE_URL from "./services";


export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const { setToken } = useContext(UserContext);
  const { setUser } = useContext(UserContext);

  const body = {
    email: email,
    password: senha,
  };

  function handleForm(event) {
    event.preventDefault();

    axios
      .post(`${BASE_URL}/sign-in`, body)
      .then((resposta) => {
        console.log("é o token?", resposta);
        setToken(resposta.data.token);
        setUser(resposta.data.user);
        navigate("/tela01");
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }

  return (
    <>
      <Container>
        <Titulo>My Wallet</Titulo>
        <form onSubmit={handleForm}>
          <div>
            <Input
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            ></Input>
          </div>

          <div>
            <Input
              placeholder="Senha"
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              required
            ></Input>
          </div>

          <Button type="submit">Entrar</Button>
        </form>
        <TxtCadastro onClick={() => navigate("/cadastro")}>
          Primeira vez? Cadastre-se!
        </TxtCadastro>
      </Container>
    </>
  );
}

export const Titulo = styled.h1`
  font-family: "Saira Stencil One", cursive;
  height: 50px;
  width: 160px;
  font-size: 32px;
  margin-bottom: 45px;
  font-weight: 400;
  color: #ffffff;
`;

export const TxtCadastro = styled.div`
  display: flex;
  justify-content: center;
  text-decoration: underline;
  color: #ffffff;
  cursor: pointer;
  line-height: 22.5px;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
`;

export const Button = styled.button`
  width: 85vw;
  height: 45px;
  background-color: #a328d6;
  border-radius: 5px;
  margin-bottom: 28px;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  box-sizing: border-box;
  cursor: pointer;
  border-style: hidden;
`;

export const Foto = styled.img`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`;

export const Input = styled.input`
  width: 85vw;
  height: 58px;
  margin-bottom: 13px;
  font-size: 20px;
  color: #262626;
  padding-left: 8px;
  border-radius: 5px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
