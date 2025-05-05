import React from "react";

export default function CadastroVoluntario() {
  return (
    <div>
      <h2>Cadastro de Voluntário</h2>
      <form>
        {/* Nome Completo */}
        <div>
          <label htmlFor="nome">Nome Completo</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Digite seu nome completo"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Digite seu email"
            required
          />
        </div>

        {/* Senha */}
        <div>
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Digite sua senha"
            required
          />
        </div>

        {/* Confirmar Senha */}
        <div>
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            placeholder="Confirme sua senha"
            required
          />
        </div>

        {/* Botão de Cadastro */}
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
