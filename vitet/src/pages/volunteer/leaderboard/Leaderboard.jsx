import React from "react";
import "./Leaderboard.css";

const mockVoluntarios = [
  { nome: "Ana Souza", pontos: 180 },
  { nome: "Carlos Lima", pontos: 150 },
  { nome: "Fernanda Oliveira", pontos: 130 },
  { nome: "João Pedro", pontos: 110 },
  { nome: "Mariana Costa", pontos: 95 },
];

const Leaderboard = () => {
  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">🏆 Ranking de Voluntários</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Posição</th>
            <th>Nome</th>
            <th>Pontos</th>
          </tr>
        </thead>
        <tbody>
          {mockVoluntarios.map((v, index) => (
            <tr
              key={index}
              className={
                index === 0
                  ? "gold"
                  : index === 1
                  ? "silver"
                  : index === 2
                  ? "bronze"
                  : ""
              }
            >
              <td>#{index + 1}</td>
              <td>{v.nome}</td>
              <td>{v.pontos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
