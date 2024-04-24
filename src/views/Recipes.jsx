const React = require('react');
const Layout = require('./Layout');

module.exports = function Home({ login, parties }) {
  return (
    <Layout login={login}>
          <h1>Potluck Party</h1>
          <br /><br />
          <div className="partyList">
            {parties.map((party) => (
              <div className="party" key={party.id}>
                <span><a href={`/party/${party.id}`}>{party.name}</a></span> <br />
                <span>Место проведения: {party.location}</span> <br />
                <span>Дата: {party.date.toLocaleDateString()}</span> <br />
                <span>Время: {party.time}</span> <br />
                <br />
              </div>
            ))}
          </div>
      {/* <script defer src="/js/party.js" /> */}
    </Layout>
  );
};