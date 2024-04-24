const React = require('react');
const Layout = require('./Layout');

function Main({ login }) {
  return (
    <Layout login={login}>
      <div className="intro">
        <h2 className="main-title">Все рецепты:</h2>
        <div className="mainContainer" />
      </div>
      <script defer src='js/main.js'></script>
    </Layout>
  );
}

module.exports = Main;
